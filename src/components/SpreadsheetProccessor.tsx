import ExcelJS from "exceljs";

import {
  FORMAT_CELL_SIZE,
  FORMAT_NORMAL_CELL,
  FORMAT_HEADER_CELL,
  FORMAT_TITLE_CELL,
} from "../constants/SpreadsheetStyling";

import { Schedule } from "./Schedule";
import { MAX_NUM_PERIODS } from "./WeekOfCourses";

const WORKBOOK_NAME = "THỜI KHÓA BIỂU LỚP";
const SHEET_COLUMN_COUNT = 7;
const CREATOR_NAME = "Ulich";
const WEEK_LABELS = [
  "TUẦN",
  "CA",
  "THỨ HAI",
  "THỨ BA",
  "THỨ TƯ",
  "THỨ NĂM",
  "THỨ SÁU",
];

/**
 * Parse a schedule into an ExcelJS workbook
 * @param schedule a schedule object
 * @param workbook the workbook to write to
 * @returns that workbook
 */
function ParseSchedule(
  schedule: Schedule,
  workbook: ExcelJS.Workbook
): ExcelJS.Workbook {
  const worksheet = workbook.addWorksheet("Summary", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      horizontalCentered: true,
      verticalCentered: true,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3,
      },
    },
  });

  const row = worksheet.addRow(
    Array(SHEET_COLUMN_COUNT).fill(
      WORKBOOK_NAME + schedule.startDate.toISOString().substring(0, 10)
    )
  );

  worksheet.properties.defaultRowHeight = FORMAT_CELL_SIZE.HEIGHT.DEFAULT;
  worksheet.properties.defaultColWidth = FORMAT_CELL_SIZE.WIDTH.DEFAULT;

  // BASIC FORMATTING
  row.eachCell({ includeEmpty: false }, (cell) => {
    cell.style = FORMAT_NORMAL_CELL;
  });

  let currentRow: ExcelJS.Row;
  schedule.weeks.forEach((week) => {
    worksheet.addRow(WEEK_LABELS, "i");

    week.ToArray().forEach((period) => {
      currentRow = worksheet.addRow(period, "i");
    });

    currentRow.addPageBreak();
  });

  return workbook;
}

/**
 * Format a prepared workbook with pre-defined properties
 * @returns that workbook
 */
function GetFormattedWorkbook(workbook: ExcelJS.Workbook): ExcelJS.Workbook {
  const worksheet = workbook.worksheets[0];
  const spsheetRange = {
    s: {
      r: 1,
      c: 1,
    },
    e: {
      r: worksheet.rowCount,
      c: worksheet.columnCount,
    },
  };

  // merge and format header row
  worksheet.mergeCells(
    spsheetRange.s.r,
    spsheetRange.s.c,
    spsheetRange.s.r,
    spsheetRange.e.c
  );
  worksheet.getCell(1, 1).style = FORMAT_HEADER_CELL;
  worksheet.getRow(1).height = FORMAT_CELL_SIZE.HEIGHT.SPECIAL;

  // merge and format the rest
  let cell: ExcelJS.Cell;
  for (
    let i = spsheetRange.s.r + 1;
    i <= spsheetRange.e.r;
    i += MAX_NUM_PERIODS + 1
  ) {
    worksheet.getRow(i).eachCell({ includeEmpty: false }, function (cell) {
      cell.style = FORMAT_TITLE_CELL;
    });

    //merge cells
    worksheet.mergeCells(i + 1, 1, i + MAX_NUM_PERIODS, 1);

    for (let shift = i + 1; shift <= i + MAX_NUM_PERIODS; shift += 2) {
      worksheet.mergeCells(shift, 2, shift + 1, 2);
    }
  }

  // format special column widths
  worksheet.getColumn(1).width = FORMAT_CELL_SIZE.WIDTH.FIRST_COL;
  worksheet.getColumn(2).width = FORMAT_CELL_SIZE.WIDTH.SECOND_COL;

  worksheet.eachRow({ includeEmpty: false }, function (row) {
    row.height = FORMAT_CELL_SIZE.HEIGHT.DEFAULT;
  });

  return workbook;
}

/**
 * Initiate the workbook with pre-defined properties
 * @param workbook the workbook to write to
 * @returns that workbook
 */
function InitiateWorkbook(workbook: ExcelJS.Workbook): ExcelJS.Workbook {
  workbook.creator = CREATOR_NAME;
  workbook.lastModifiedBy = CREATOR_NAME;
  workbook.created = new Date(Date.now());
  workbook.modified = new Date(Date.now());
  workbook.lastPrinted = new Date(Date.now());

  return workbook;
}

/**
 * Parse a schedule object into an ExcelJS workbook
 * @param schedule a schedule object to parse
 * @returns a workbook containing the schedule
 */
export default function GenerateSpreadsheet(
  schedule: Schedule
): ExcelJS.Workbook {
  let workbook = InitiateWorkbook(new ExcelJS.Workbook());

  return GetFormattedWorkbook(ParseSchedule(schedule, workbook));
}
