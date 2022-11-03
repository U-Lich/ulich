import WeekOfCourses from "./WeekOfCourses";
import Course from "./Course";
import { HEADER_TYPES } from "../constants/HeaderTypes";
import * as d3 from "d3";
import { PASTEBIN_MESSAGE } from "../constants/FormDefaultValues";

const NUM_WEEK = 21;

export type ScheduleHeader = {
    key: string,
    validity: boolean,
    value: string[]
}

export type ScheduleHeaders = {
    cOrder: ScheduleHeader,
    cId: ScheduleHeader,
    cGroup: ScheduleHeader,
    cName: ScheduleHeader,
    cType: ScheduleHeader,
    cDates: ScheduleHeader,
    cPeriods: ScheduleHeader,
    cRoom: ScheduleHeader,
    cWeeks: ScheduleHeader,
    [key: string]: ScheduleHeader
}

export class Schedule {
    public startDate: Date;
    public scheduleName: string;
    public rawPastebin: string;
    public weeks: WeekOfCourses[];
    private df: d3.DSVRowArray<string> | undefined;
    private headers: ScheduleHeaders;
    private _isValidSchedule: boolean;

    get isValidSchedule() {return this._isValidSchedule;}

    constructor() {
        this.startDate = new Date(Date.now());
        this.scheduleName = "THỜI KHÓA BIỂU LỚP";
        this.rawPastebin = "";
        this.headers = HEADER_TYPES;
        this._isValidSchedule = false;
        this.df = undefined;
        
        this.weeks = [];
        let currentDate = new Date(this.startDate);
        for (let i = 0; i < NUM_WEEK; i++) {
            this.weeks[i] = new WeekOfCourses(i + 1, new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 7);
        }

    }

    private ParseWeeks(): boolean {
        try {
            let parsedCourse: Course;
            this.df?.forEach(row => {
                parsedCourse = new Course(
                    row[this.headers.cName.key]!,
                    this.headers.cType.validity?    row[this.headers.cType.key]! : undefined,
                    row[this.headers.cDates.key]!,
                    row[this.headers.cPeriods.key]!,
                    row[this.headers.cWeeks.key]!
                )

                for (let avail of parsedCourse.weeks) {
                    this.weeks[avail - 1].courses[parsedCourse.date].push(parsedCourse);
                }
            });
            
            return true;
        } catch (error) {
            console.log("Error parsing weeks: " + error);
            return false;
        }
    }

    public ParseRawULAWSchedule(): boolean {
        try {
            // update weeks' date
            let currentDate = new Date(this.startDate);
            for (let i = 0; i < NUM_WEEK; i++) {
                this.weeks[i].weekDate = new Date(currentDate);
                currentDate.setDate(currentDate.getDate() + 7);
            }

            // TODO: Optimize this
            let extraSpaceRegex = / \ +/gm;
            let whitespaceInQuotationRegex = /\".+[\s\d]*\"/gm;
            
            let quotationBlock: string;
            Array.from(this.rawPastebin.matchAll(whitespaceInQuotationRegex)).forEach(element => {
                quotationBlock = element[0].replace(/\"/gm, "");
                quotationBlock = quotationBlock.replace(/\f+|\r+|\n+|\t+|\v+/gm, " ");
                
                this.rawPastebin = this.rawPastebin.replace(element[0], quotationBlock);
            });

            this.rawPastebin = this.rawPastebin.replaceAll(extraSpaceRegex, "").trim();
      
            // header format parse
            let headerSplit = this.rawPastebin.match(/\n/s);
            this.rawPastebin = this.rawPastebin.slice(0, headerSplit?.index).replaceAll(/ *\d+/g, "").concat(this.rawPastebin.slice(headerSplit?.index));

            this.df = d3.tsvParse(this.rawPastebin);
            
            // header recognition
            Object.entries(this.headers).forEach(entry => {
                this.headers[entry[0]].validity = false;

                for (let synonym in entry[1].value) {
                    if (this.df?.columns.includes(entry[1].value[synonym])) {
                        this.headers[entry[0]].key = entry[1].value[synonym];
                        this.headers[entry[0]].validity = true;
                        
                        break;
                    }
                }
            });
            
            if (this.headers.cName.validity && this.headers.cDates.validity && this.headers.cPeriods.validity && this.headers.cWeeks.validity) {
                return this.ParseWeeks();
            }

            return false;
        } catch (error) {
            this._isValidSchedule = false;
            console.log("Error parsing schedule: " + error);

            return false;
        }
    }
}