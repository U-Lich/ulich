import WeekOfCourses from "./WeekOfCourses";
import Course from "./Course";
import ExcelJS from "exceljs";
import GenerateSpreadsheet from "./SpreadsheetProccessor";
import * as d3 from "d3";

const TXT_REGEX = /[\p{L}\d][\p{L}\p{M}\d, _-]+[\p{L}\p{M}\d]/ug;
const NUM_REGEX = /[\p{N}_-]+/ug;
const NUM_WEEK = 21;

export default class Schedule {
    scheduleName: string;
    rawPastebin: string;
    weeks: WeekOfCourses[];

    constructor() {
        this.rawPastebin = "";
        this.scheduleName = "";

        this.weeks = [];
        let currentDate = Date.now();
        for (let i = 0; i < NUM_WEEK; i++) {
            this.weeks[i] = new WeekOfCourses(i + 1, currentDate);
        }
    }

    ParseRawULAWSchedule(): boolean {
        if (this.#IsValidRawData()) {
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
      
            // header parse
            let headerSplit = this.rawPastebin.match(/\n/s);
            this.rawPastebin = this.rawPastebin.slice(0, headerSplit?.index).replaceAll(/ *\d+/g, "").concat(this.rawPastebin.slice(headerSplit?.index));

            let df = d3.tsvParse(this.rawPastebin);
            console.log(df);

            return false;
        }

        // TODO: return TRUE OR FALSE on SUCCESS or FAILURE. Originally return Spreadsheet which is dumb and not coherent

        return false;
    }

    /**
     * 
     * @returns {boolean} true if the loaded raw data is valid
     */
    #IsValidRawData(): boolean {
        // TODO: Implement this!
        return true;
    }
}