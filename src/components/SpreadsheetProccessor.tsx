import {utils, WorkSheet, WorkBook} from "sheetjs-style";
// eslint-disable-next-line
import WeekOfCourses from "./WeekOfCourses";
import styling from "../constants/SpreadsheetStyling.json";

const SHEET_COLUMN_COUNT = 7;

function ParseWeeksToWorkSheet(weeksArray: WeekOfCourses[]): WorkSheet {
    // TODO: Add a Schedule class to house both the week array and the worksheet's name plus anything else.
    let worksheet = utils.aoa_to_sheet([Array(SHEET_COLUMN_COUNT).fill("Table Name")])
    
    weeksArray.forEach(week => {
        utils.sheet_add_aoa(worksheet, week.ToArray(), {origin: -1});
    });

    return worksheet;
}

function GetFormattedSpreadsheet(worksheet: WorkSheet, weeksArray: WeekOfCourses[]): WorkSheet{
    let spsheetRange = utils.decode_range(worksheet['!ref']!);
    
    // format column width
    worksheet['!cols'] = styling.column_width_array_7;

    // format title row
    for (let j = spsheetRange.s.c; j <= spsheetRange.e.c; j++) {
        worksheet[utils.encode_cell({r: spsheetRange.s.r, c: j})].s = styling.title;
    }

    // format the rest
    for (let i = spsheetRange.s.r + 1; i <= spsheetRange.e.r; i++) {
        for (let j = spsheetRange.s.c; j <= spsheetRange.e.c; j++) {
            let cell = worksheet[utils.encode_cell({r: i, c: j})];

            // TODO: Add a Schedule class and have this be an internal check of the specific weeksArray
            if ((i + 12) % 13 === 0) {
                cell.s = styling.subtitle;
            } else {
                cell.s = styling.normal_text;
            }
        }
    }
    
    // merge cells
    if (!worksheet['!merges']) { worksheet['!merges'] =[]; }

    // merge title cells
    worksheet['!merges'].push({
        s: { r: spsheetRange.s.r, c: spsheetRange.s.c },
        e: { r: spsheetRange.s.r, c: spsheetRange.e.c }
    });

    weeksArray.forEach(week => {
        let mergeRange = week.ToMergedRange();
        mergeRange.forEach(shift => {
            worksheet['!merges']!.push(shift);
        });
    });

    return worksheet;
}

export default function GenerateSpreadsheet(weeksArray: WeekOfCourses[]): WorkBook {
    let workbook = utils.book_new();

    utils.book_append_sheet(
        workbook,
        GetFormattedSpreadsheet( ParseWeeksToWorkSheet(weeksArray), weeksArray),
        "Summary"
    );

    return workbook;
}