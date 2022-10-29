import WeekOfCourses from "./WeekOfCourses";
import Course from "./Course";
import ExcelJS from "exceljs";
import GenerateSpreadsheet from "./SpreadsheetProccessor";
import { HEADER_TYPES } from "../constants/HeaderTypes";
import * as d3 from "d3";

const TXT_REGEX = /[\p{L}\d][\p{L}\p{M}\d, _-]+[\p{L}\p{M}\d]/ug;
const NUM_REGEX = /[\p{N}_-]+/ug;
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
    public scheduleName: string;
    public rawPastebin: string;
    public weeks: WeekOfCourses[];
    private headers: ScheduleHeaders;

    private _isValidSchedule: boolean;
    get isValidSchedule() {return this._isValidSchedule;}

    constructor() {
        this.rawPastebin = "";
        this.scheduleName = "";
        this.headers = HEADER_TYPES;
        this._isValidSchedule = false;

        this.weeks = [];
        let currentDate = Date.now();
        for (let i = 0; i < NUM_WEEK; i++) {
            this.weeks[i] = new WeekOfCourses(i + 1, currentDate);
        }
    }

    private ParseWeeks(): boolean {
        try {
            // let currentDate = Date.now();

            // this.weeks.forEach(week => {
            //     week.courses["Thứ Hai"].
            // });

            return true;
        } catch (error) {
            console.log("Error parsing weeks: " + error);
            return false;
        }
    }

    public ParseRawULAWSchedule(): boolean {
        try {
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

            let df = d3.tsvParse(this.rawPastebin);
            
            // header recognition
            Object.entries(this.headers).forEach(entry => {
                this.headers[entry[0]].validity = false;
                for (let synonym in entry[1].value) {
                    if (df.columns.includes(synonym)) {
                        this.headers[entry[0]].key = synonym;
                        this.headers[entry[0]].validity = true;
                        
                        break;
                    }
                }
            });

            // TODO: return TRUE OR FALSE on SUCCESS or FAILURE. Originally return Spreadsheet which is dumb and not coherent
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