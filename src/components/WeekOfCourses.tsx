import { StringCacher } from "./StringCacher";

const digitsRegex = /\d+/;

/**
 * Parse a single line of text to a number array of it
 * @param text single line of text
 * @returns array of numbers
 */
function ParseStringToArray(text: string): number[] {
  let arr: number[] = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i].match(digitsRegex) !== null) {
      arr.push(i + 1);
    }
  }

  return arr;
}

export class Course {
  public name: string;
  public type: string;
  public date: string;
  public periods: number[];
  public weeks: number[];

  constructor(
    name: string,
    type: string,
    date: string,
    period: string,
    week: string
  ) {
    this.name = name;
    this.type = type;
    this.date = date;
    this.periods = ParseStringToArray(period);
    this.weeks = ParseStringToArray(week);
  }
}

const DATES_CACHE_LEVEL = 1;
const MAX_NUM_SHEET_COLUMNS = 7;
export const MAX_NUM_PERIODS = 12;

/**
 * Shift an integer
 * @param x integer
 * @returns Shifted integer
 */
function ShiftEquation(x: number) {
  return (2 * x + 2 - (1 + Math.pow(-1, x))) / 4;
}

export class WeekOfCourses {
  private static dates: {
    [name: string]: number;
  } = {
    T2: 0,
    T3: 1,
    T4: 2,
    T5: 3,
    T6: 4,
  };

  private static COURSE_TYPE_FILTER = new StringCacher(1, [
    "Lý thuyết",
    "Lý thuyết",
    "Lý Thuyết",
    "Lý Thuyết",
    "Ly thuyet",
    "Ly Thuyet",
    "Lyù thuyeát",
  ]);

  private weekNumber: number;
  private weekHeader: string;

  private courses: {
    T2: {
      [name: string]: Course;
    };
    T3: {
      [name: string]: Course;
    };
    T4: {
      [name: string]: Course;
    };
    T5: {
      [name: string]: Course;
    };
    T6: {
      [name: string]: Course;
    };
    [name: string]: {
      [name: string]: Course;
    };
  };

  constructor(week: number, from: Date) {
    this.weekNumber = week;
    this.weekHeader = this.ParseDate(from); // will be set in ParseDate()
    this.courses = {
      T2: {},
      T3: {},
      T4: {},
      T5: {},
      T6: {},
    };
  }

  // function to reset the week
  public reset() {
    for (const key in this.courses) {
      this.courses[key] = {};
    }
  }

  /**
   * weekDate setter
   */
  public setDate(date: Date) {
    this.weekHeader = this.ParseDate(date);
  }

  /**
   * @returns {string[][]} 2D array of string to be used in the spreadsheet
   */
  public ToArray(): string[][] {
    let weekArray: string[][] = Array(MAX_NUM_PERIODS);

    // i (0-indexed) is an integer value representing the period,
    // on which a course starts on that day
    // NOTE: periods are 1-indexed
    for (let i = 0; i < MAX_NUM_PERIODS; i++) {
      // fill array
      weekArray[i] = Array(MAX_NUM_SHEET_COLUMNS).fill("");
      // row 0 and 1 are header rows the rest starts from 2
      weekArray[i][1] = String(ShiftEquation(i + 1));
    }

    weekArray[0][0] = this.weekHeader;

    // place courses into the array based on their period
    // eq is the equivalent integer of the days in the week
    // For each day in the week,
    Object.entries(WeekOfCourses.dates).forEach(([key, equivalent]) => {
      // we look at the courses in that day,
      Object.entries(this.courses[key]).forEach(([period, course]) => {
        // NOTE: weekArray (0-indexed) 's period rows start at 0 but periods are 1-indexed
        // NOTE: dates' columns start at 2 but their number equivalent is 0-indexed

        // and we place the course in the corresponding period and day.
        weekArray[Number(period) - 1][equivalent + 2] = course.name;

        // if it's not a theory course, we add the course's type
        if (!WeekOfCourses.COURSE_TYPE_FILTER.includes(course.type)) {
          weekArray[Number(period) - 1][equivalent + 2] +=
            " (" + course.type + ")";
        }
      });
    });

    return weekArray;
  }

  /**
   * Add a course to the week
   * @param {Course} course to add
   */
  public addCourse(course: Course) {
    course.periods.forEach((period) => {
      this.courses[course.date][period] = course;
    });
  }

  /**
   * Parse Date into formatted date string for the spreadsheet
   */
  private ParseDate(date: Date): string {
    // generate week's date string
    let to = new Date(date);
    to.setDate(to.getDate() + 4);

    return (
      String(this.weekNumber) +
      "\n" +
      date.toISOString().substring(0, 10) +
      "\n" +
      "-" +
      "\n" +
      to.toISOString().substring(0, 10)
    );
  }
}
