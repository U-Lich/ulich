import { Style } from 'exceljs';

export const FORMAT_CELL_SIZE = {
    WIDTH: {
        DEFAULT: 25,    // default width of cells
        FIRST_COL: 16,  // width of the first column
        SECOND_COL: 6   // width of the second column
    },
    HEIGHT: {
        DEFAULT: 45,    // default height of cells
        SPECIAL: 50     // height of title row
    }
};

export const FORMAT_NORMAL_CELL: Partial<Style> = {
	font: {
        name: 'Times New Roman',
        family: 1,
        size: 12,
        bold: false
    },
	alignment: {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
    },
    border: {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' }
    }
};

export const FORMAT_HEADER_CELL: Partial<Style> = {
    font: {
        name: 'Times New Roman',
        family: 1,
        size: 14,
        bold: true
    },
	alignment: {
        horizontal: 'center',
        vertical: 'middle'
    },
    border: {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' }
    }
};

export const FORMAT_TITLE_CELL: Partial<Style> = {
    font: {
        name: 'Times New Roman',
        family: 1,
        size: 12,
        bold: true
    },
	alignment: {
        horizontal: 'center',
        vertical: 'middle'
    },
    border: {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' }
    },
    fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'FFACD3E6'}
    }
};