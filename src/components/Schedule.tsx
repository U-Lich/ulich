import { WeekOfCourses, Course } from "./WeekOfCourses";
import { StringCacher } from "./StringCacher";
import { DATES_DICT } from "../constants/DatesStrings";
import { HEADER_TYPES } from "../constants/HeaderTypes";
import { DSVRowArray, tsvParse } from "d3";
import { InvalidDataTypeError, MissingHeaderError } from "./UlichError";

const NUM_WEEK = 21;
const DATE_CACHE_LEVEL = 2;
const EXTRA_SPACE_REGEX = / \ +/gm;
const QUOTATION_REGEX = /\".+\"/gms;
const QUOTATION_REMOVAL_REGEX = /\s+/gm;
const DEFAULT_SCHEDULE_NAME = "THỜI KHÓA BIỂU LỚP";

export type ScheduleHeader = {
  key: string;
  validity: boolean;
  value: string[];
  regex: RegExp;
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
    this.scheduleName = DEFAULT_SCHEDULE_NAME;
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
   * Calls reset() on this.weeks and reset header dictionary entries' validities
   */
  public reset() {
    this.weeks = [];
    for (let i = 0; i < NUM_WEEK; i++) {
      this.weeks[i].reset();
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

    this.rawPastebin = this.PrepareRawData();
    this.df = this.ParseDataIntoDataframe();

    // find invalid core headers
    let coreHeaders = [
      this.headers.cName,
      this.headers.cDates,
      this.headers.cPeriods,
      this.headers.cWeeks,
      this.headers.cType,
    ];

    let missingHeaderMessage: string[] = [];

    coreHeaders.forEach((header) => {
      if (!header.validity) {
        missingHeaderMessage.push(header.value[0]);
      } else {
        this.df!.forEach((row) => {
          let mat = row[header.key]!.match(header.regex);
          if (mat === null || mat.length > 1 || mat[0] !== row[header.key]!) {
            throw new InvalidDataTypeError(
              `Tìm thấy dữ liệu không hợp lệ cho cột ${header.key}`,
              Object.values(row).join(", ")
            );
          }
        });
      }
    });

    if (missingHeaderMessage.length > 0) {
      throw new MissingHeaderError(
        "Thiếu các tiêu đề không thể thiếu",
        missingHeaderMessage
      );
    }

    this.ParseWeeks();
  }

  /**
   * Parse the raw pastebin data into a dataframe
   * @returns the dataframe
   */
  private ParseDataIntoDataframe(): DSVRowArray<string> {
    // parse into dataframe
    let df = tsvParse(this.rawPastebin);

    // TODO: Optimize the huge loop below by having the dictionary
    // be searched vertically 0[0], 1[0], 2[0]... 0[1], 1[1], 2[1]...
    // instead of horizontally 0[0], 0[1], 0[2]... 1[0], 1[1], 1[2]...
    // I'm too tired to do it now

    // watch input string and save appropriate header keys
    Object.keys(this.headers).forEach((headerId) => {
      this.headers[headerId].validity = false;

      if (
        this.headers[headerId].key !== "" &&
        df.columns.includes(this.headers[headerId].key)
      ) {
        this.headers[headerId].validity = true;
      } else {
        for (let synonym in this.headers[headerId].value) {
          if (df.columns.includes(this.headers[headerId].value[synonym])) {
            this.headers[headerId].key = this.headers[headerId].value[synonym];
            this.headers[headerId].validity = true;

            break;
          }
        }
      }
    });

    return df;
  }

  /**
   * Prepare the raw pastebin by removing quotation marks and unnecessary characters
   * @returns the prepared raw pastebin
   */
  private PrepareRawData(): string {
    let pastebin = this.rawPastebin;
    // collapse whitespace character in quotation marks
    let quotationBlock: string;
    Array.from(pastebin.matchAll(QUOTATION_REGEX)).forEach((element) => {
      quotationBlock = element[0]
        .replaceAll('"', "")
        .replaceAll(QUOTATION_REMOVAL_REGEX, " ");

      // split rawPastebin into 3 parts and replace the middle part at element.index
      pastebin =
        pastebin.substring(0, element.index) +
        quotationBlock +
        pastebin.substring(element.index! + element[0].length + 1);
    });

    // split into line arrays
    let headerSplitArray = pastebin.match(/^.+$/m);

    if (headerSplitArray === null) {
      throw new MissingHeaderError("Không thể tìm được tiêu đề: ", [
        "Hàng đầu tiên",
      ]);
    }

    // remove digits from headerSplitArray[0]
    // replace pastebin from 0 to headerSplitArray[0].length
    // with headerSplitArray[0]
    pastebin =
      headerSplitArray[0].replace(/ *\d+/g, "") +
      pastebin.slice(headerSplitArray[0].length);

    // remove all extra spaces
    // and trim leading and trailing spaces
    pastebin = pastebin.replaceAll(EXTRA_SPACE_REGEX, "").trim();

    return pastebin;
  }

  /**
   * Parse date string into a key by DateString's standard
   * @param dateString the string to parse, see DateString for more info
   * @returns key of the date string
   */
  private ParseDateStringToKey(dateString: string): string | undefined {
    let found = "";
    // return immediately if found
    Object.entries(this.dateStringCachers).forEach(([key, cacheArray]) => {
      if (cacheArray.softSearch(dateString, 2)) {
        found = key;
      }
    });

    if (found !== "") {
      return found;
    }

    // use long thorough search
    Object.entries(this.dateStringCachers).forEach(([key, cacheArray]) => {
      if (cacheArray.search(dateString)) {
        found = key;
      }
    });

    if (found !== "") {
      return found;
    }

    return undefined;
  }

  /**
   * Parse raw data into weeks
   * @returns true if parsed successfully, false otherwise
   */
  private ParseWeeks(): boolean {
    let parsedCourse: Course;
    this.df!.forEach((row) => {
      let date = this.ParseDateStringToKey(row[this.headers.cDates.key]!);
      if (date === undefined) {
        throw new InvalidDataTypeError(
          "Tìm thấy dữ liệu không hợp lệ tại cột ngày học: ",
          Object.values(row).join(", ")
        );
      }

      parsedCourse = new Course(
        row[this.headers.cName.key]!,
        row[this.headers.cType.key]!,
        date,
        row[this.headers.cPeriods.key]!,
        row[this.headers.cWeeks.key]!
      );

      // Course's week is 1-indexed while this.weeks is 0-indexed
      parsedCourse.weeks.forEach((week) => {
        this.weeks[week - 1].addCourse(parsedCourse);
      });
    });

    return true;
  }
}
