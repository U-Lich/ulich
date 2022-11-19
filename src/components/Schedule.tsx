import { WeekOfCourses } from "./WeekOfCourses";
import { Course } from "./Course";
import { StringCacher } from "./StringCacher";
import { DATES_DICT } from "../constants/DatesStrings";
import { HEADER_TYPES } from "../constants/HeaderTypes";
import { tsvParse } from "d3";
import {
  InvalidDateTypeException,
  InvalidHeaderException,
} from "./UlichException";

const NUM_WEEK = 21;
const DATE_CACHE_LEVEL = 2;
const EXTRA_SPACE_REGEX = / \ +/gm;
const WHITESPACE_IN_QUOTATION_REGEX = /\".+[\s\d]*\"/gm;

export type ScheduleHeader = {
  key: string;
  validity: boolean;
  value: string[];
};

export type ScheduleHeaders = {
  cOrder: ScheduleHeader;
  cId: ScheduleHeader;
  cGroup: ScheduleHeader;
  cName: ScheduleHeader;
  cType: ScheduleHeader;
  cDates: ScheduleHeader;
  cPeriods: ScheduleHeader;
  cRoom: ScheduleHeader;
  cWeeks: ScheduleHeader;
  [key: string]: ScheduleHeader;
};

export class Schedule {
  public startDate: Date;
  public scheduleName: string;
  public rawPastebin: string;
  public weeks: WeekOfCourses[];
  private df: d3.DSVRowArray<string> | undefined;
  private headers: ScheduleHeaders;
  private dateStringCachers: { [name: string]: StringCacher };

  constructor() {
    this.startDate = new Date(Date.now());
    this.scheduleName = "THỜI KHÓA BIỂU LỚP";
    this.rawPastebin = "";
    this.headers = HEADER_TYPES;
    this.df = undefined;

    // setup string cachers for dates
    this.dateStringCachers = {};
    Object.entries(DATES_DICT).forEach(([key, cacheArray]) => {
      this.dateStringCachers[key] = new StringCacher(
        DATE_CACHE_LEVEL,
        cacheArray
      );
    });

    this.weeks = [];
    let currentDate = new Date(this.startDate);
    for (let i = 0; i < NUM_WEEK; i++) {
      this.weeks[i] = new WeekOfCourses(i + 1, new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  /**
   * Convert a Date object to a string in the format of dd/mm/yyyy
   */
  public DateToString(): string {
    return this.startDate.toISOString().substring(0, 10);
  }

  /**
   * Parse the raw pastebin data into a dataframe
   * @returns true if parsed successfully, false otherwise
   */
  public ParseRawULAWSchedule() {
    // update weeks' date
    let currentDate = new Date(this.startDate);
    for (let i = 0; i < NUM_WEEK; i++) {
      this.weeks[i].setDate(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }

    // collapse whitespace character in quotation marks
    let quotationBlock: string;
    Array.from(
      this.rawPastebin.matchAll(WHITESPACE_IN_QUOTATION_REGEX)
    ).forEach((element) => {
      quotationBlock = element[0].replace(/\"/gm, "");
      quotationBlock = quotationBlock.replace(/\f+|\r+|\n+|\t+|\v+/gm, " ");

      this.rawPastebin = this.rawPastebin.replace(element[0], quotationBlock);
    });

    this.rawPastebin = this.rawPastebin
      .replaceAll(EXTRA_SPACE_REGEX, "")
      .trim();

    // split into line array
    let headerSplit = this.rawPastebin.match(/\n/s);
    this.rawPastebin = this.rawPastebin
      .slice(0, headerSplit?.index)
      .replaceAll(/ *\d+/g, "")
      .concat(this.rawPastebin.slice(headerSplit?.index));

    // parse into dataframe
    this.df = tsvParse(this.rawPastebin);

    // TODO: Optimize the huge loop below by having the dictionary
    // be searched vertically 0[0], 1[0], 2[0]... 0[1], 1[1], 2[1]...
    // instead of horizontally 0[0], 0[1], 0[2]... 1[0], 1[1], 1[2]...
    // I'm too tired to do it now

    // watch input string and save appropriate header keys
    Object.entries(this.headers).forEach((entry) => {
      this.headers[entry[0]].validity = false;

      for (let synonym in entry[1].value) {
        if (this.df?.columns.includes(entry[1].value[synonym])) {
          this.headers[entry[0]].key = entry[1].value[synonym];
          this.headers[entry[0]].validity = true;

          break;
        }
      }
    });

    // find invalid core headers
    let coreHeaders = [
      this.headers.cName,
      this.headers.cDates,
      this.headers.cPeriods,
      this.headers.cWeeks,
      this.headers.cType,
    ];

    let invalidMessage = "";
    coreHeaders.forEach((value) => {
      if (!value.validity) {
        invalidMessage += value.value[0] + ", ";
      }
    });

    if (invalidMessage.length > 0) {
      throw new InvalidHeaderException(
        "Could not parse headers from raw text!",
        invalidMessage
      );
    }

    this.ParseWeeks();
  }

  /**
   * Parse date string into a key by DateString's standard
   * @param dateString the string to parse, see DateString for more info
   * @returns key of the date string
   */
  private ParseDateStringToKey(dateString: string): string {
    let found = "";
    // return immediately if found
    Object.entries(this.dateStringCachers).forEach(([key, cacheArray]) => {
      if (cacheArray.softIncludes(dateString)) {
        found = key;
      }
    });

    if (found !== "") {
      return found;
    }

    // use long thorough search
    Object.entries(this.dateStringCachers).forEach(([key, cacheArray]) => {
      if (cacheArray.includes(dateString)) {
        found = key;
      }
    });

    if (found !== "") {
      return found;
    }

    throw new InvalidDateTypeException(
      "Could not read date string!",
      dateString
    );
  }

  /**
   * Parse raw data into weeks
   * @returns true if parsed successfully, false otherwise
   */
  private ParseWeeks(): boolean {
    let parsedCourse: Course;
    this.df!.forEach((row) => {
      parsedCourse = new Course(
        row[this.headers.cName.key]!,
        row[this.headers.cType.key]!,
        this.ParseDateStringToKey(row[this.headers.cDates.key]!),
        row[this.headers.cPeriods.key]!,
        row[this.headers.cWeeks.key]!
      );

      parsedCourse.weeks.forEach((week) => {
        this.weeks[week].addCourse(parsedCourse);
      });
    });

    return true;
  }
}
