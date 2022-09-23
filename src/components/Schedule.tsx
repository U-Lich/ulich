import WeekOfCourses from "./WeekOfCourses";
import Course from "./Course";
import ExcelJS from "exceljs";
import GenerateSpreadsheet from "./SpreadsheetProccessor";

const TXT_REGEX = /[\p{L}\d][\p{L}\p{M}\d, _-]+[\p{L}\p{M}\d]/ug;
const NUM_REGEX = /[\p{N}_-]+/ug;
const NUM_WEEK = 21;

export default class Schedule {
    rawData: {
        courseName: string,
        courseType: string,
        courseDay: string,
        coursePeriod: string,
        courseWeek: string
    };

    scheduleName: string;
    weeks: WeekOfCourses[];

    constructor() {
        this.rawData = {
            courseName: "",
            courseType: "",
            courseDay: "",
            coursePeriod: "",
            courseWeek: ""
        };

        this.scheduleName = "";

        this.weeks = [];
        let currentDate = Date.now();
        for (let i = 0; i < NUM_WEEK; i++) {
            this.weeks[i] = new WeekOfCourses(i + 1, currentDate);
        }
    }

    ParseRawULAWSchedule(): ExcelJS.Workbook | null {
        if (this.#IsValidRawData()) {
            let parsedData: {
                courseName: string[] | null,
                courseType: string[] | null,
                courseDay: string[] | null,
                coursePeriod: string[] | null,
                courseWeek: string[] | null
            } = {
                courseName: [],
                courseType: [],
                courseDay: [],
                coursePeriod: [],
                courseWeek: []
            };
            
            // regex parse
            parsedData.courseName = this.rawData.courseName.match(TXT_REGEX);
            parsedData.courseType = this.rawData.courseType.match(TXT_REGEX);
            parsedData.courseDay = this.rawData.courseDay.match(TXT_REGEX);
            parsedData.coursePeriod = this.rawData.coursePeriod.match(NUM_REGEX);
            parsedData.courseWeek = this.rawData.courseWeek.match(NUM_REGEX);
            let parsedCourse;

            let noOCourse: number = 0;
            if (parsedData.courseName != null && 
                parsedData.courseType != null &&
                parsedData.courseDay != null &&
                parsedData.coursePeriod != null &&
                parsedData.courseWeek != null
            ) {
                noOCourse = parsedData.courseName.length;
                for (let i = 0; i < noOCourse; i++) {
                    parsedCourse = new Course(
                        parsedData.courseName[i], 
                        parsedData.courseType[i], 
                        parsedData.courseDay[i], 
                        parsedData.coursePeriod[i], 
                        parsedData.courseWeek[i]
                    );
    
                    for (let avail of parsedCourse.weeks) {
                        this.weeks[avail - 1].courses[parsedCourse.date].push(parsedCourse);
                    }
                }

                return GenerateSpreadsheet(this);
            }

            return null;
        }

        return null;
    }

    /**
     * 
     * @returns {boolean} true if the loaded raw data is valid
     */
    #IsValidRawData(): boolean {
        return true;
    }
}