import Course from "./Course";
import { DATES_DICT } from "../constants/DatesStrings";
import { StringCacher } from "./StringCacher";

const DATES_CACHE_LEVEL = 1;

type CacheEquivalentPair = {
  cache: StringCacher;
  eq: number;
};

class WeekOfCourses {
  static MAX_NUM_SHEET_COLUMNS = 7;
  static MAX_NUM_PERIODS = 12;

  static dates: {
    [name: string]: CacheEquivalentPair;
  } = {
    T2: { cache: new StringCacher(DATES_CACHE_LEVEL, DATES_DICT["T2"]), eq: 0 },
    T3: { cache: new StringCacher(DATES_CACHE_LEVEL, DATES_DICT["T3"]), eq: 1 },
    T4: { cache: new StringCacher(DATES_CACHE_LEVEL, DATES_DICT["T4"]), eq: 2 },
    T5: { cache: new StringCacher(DATES_CACHE_LEVEL, DATES_DICT["T5"]), eq: 3 },
    T6: { cache: new StringCacher(DATES_CACHE_LEVEL, DATES_DICT["T6"]), eq: 4 },
  };

  static COURSE_TYPE_FILTER = new StringCacher(1, [
    "Lý thuyết",
    "Lý thuyết",
    "Lý Thuyết",
    "Lý Thuyết",
    "Ly thuyet",
    "Ly Thuyet",
    "Lyù thuyeát",
  ]);

  static #dotw = [
    { name: "Thứ Hai", value: 0 },
    { name: "Thứ Ba", value: 1 },
    { name: "Thứ Tư", value: 2 },
    { name: "Thứ Năm", value: 3 },
    { name: "Thứ Sáu", value: 4 },
  ];

  weekNumber: number;
  weekDate: Date;
  weekHeader: string;
  courses: {
    [name: string]: {
      [name: string]: Course;
    };
  };

  constructor(week: number, from: Date) {
    this.weekNumber = week;
    this.weekDate = from;
    this.weekHeader = "";
    this.courses = {
      T2: {},
      T3: {},
      T4: {},
      T5: {},
      T6: {},
    };

    this.ParseDate();
  }

  ParseDate() {
    // generate week from-to string
    let to = new Date(this.weekDate);
    to.setDate(to.getDate() + 4);

    this.weekHeader =
      String(this.weekNumber) +
      "\n" +
      this.weekDate.toISOString().substring(0, 10) +
      "\n" +
      "-" +
      "\n" +
      to.toISOString().substring(0, 10);
  }

  static #ShiftEquation(x: number) {
    return (2 * x + 2 - (1 + Math.pow(-1, x))) / 4;
  }

  ToArray(): string[][] {
    let weekArray: string[][] = Array<string[]>(
      WeekOfCourses.MAX_NUM_PERIODS + 2
    ).fill(Array<string>(WeekOfCourses.MAX_NUM_SHEET_COLUMNS).fill(""));

    // i (0-indexed) is an integer value representing the period,
    // on which a course starts on that day
    // NOTE: periods are 1-indexed
    weekArray[0][0] = this.weekHeader;

    for (let i = 0; i < WeekOfCourses.MAX_NUM_PERIODS; i++) {
      // row 0 and 1 are header rows the rest starts from 2
      weekArray[i][1] = String(WeekOfCourses.#ShiftEquation(i + 1));
    }

    // eq is 0-indexed, +2 to comply to "the rest starts from 2"
    Object.entries(WeekOfCourses.dates).forEach(([key, cacheEquiv]) => {
      Object.entries(this.courses[key]).forEach(([period, course]) => {
        // weekArray (0-indexed) 's period rows start at 2 but period are 1-indexed
        // 2 + period - 1
        // cacheEquiv is 0-indexed but dates' columns start at 2
        weekArray[1 + Number(period)][cacheEquiv.eq + 2] = course.name;
        if (WeekOfCourses.COURSE_TYPE_FILTER.includes(course.type)) {
          weekArray[1 + Number(period)][cacheEquiv.eq + 2] +=
            " (" + course.type + ")";
        }
      });
    });

    return weekArray;
  }

  ToMergedRange() {
    let startRow = 13 * this.weekNumber - 11; // x + 1 + 12 * (x - 1 )
    let arr = [
      {
        s: { r: startRow, c: 0 },
        e: { r: startRow + WeekOfCourses.MAX_NUM_PERIODS - 1, c: 0 },
      },
    ];

    for (let i = 0; i < WeekOfCourses.MAX_NUM_PERIODS; i += 2) {
      arr.push({
        s: { r: i + startRow, c: 1 },
        e: { r: i + startRow + 1, c: 1 },
      });
    }
    return arr;
  }

  RowIterator() {
    let nextRow = 13 * this.weekNumber - 12;

    const rangeIterator = {
      begin: {
        s: { r: nextRow, c: 0 },
        e: { r: nextRow, c: 6 },
      },

      end: null,

      next() {
        let result;
        if (nextRow < WeekOfCourses.MAX_NUM_PERIODS) {
          result = {
            s: { r: nextRow, c: 0 },
            e: { r: nextRow, c: 6 },
          };

          nextRow += 1;
          return result;
        }

        return null;
      },
    };

    return rangeIterator;
  }
}

export default WeekOfCourses;
