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
    // TODO: implement ID indexing acording to DateStrings.tsx
    this.name = name;
    this.type = type;
    this.date = date;
    this.periods = ParseStringToArray(period);
    this.weeks = ParseStringToArray(week);
  }
}
