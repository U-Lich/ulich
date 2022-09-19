const digitsRegex = /\d+/;
export default class Course {
    name: string;
    type: string;
    date: string;
    periods: number[];
    weeks: number[];

    constructor(name: string, type: string, day: string, period: string, week: string) {
        // this.parseAvailablePeriods = this.parseAvailablePeriods.bind(this);
        // this.parseAvailableWeeks = this.parseAvailableWeeks.bind(this);
        this.name = name;
        this.type = type;

        this.date = day;
        this.periods = this.#parseAvailablePeriods(period);
        this.weeks = this.#parseAvailableWeeks(week);
    }

    #parseAvailablePeriods(text: string) : number[] {
        let periods = [];
        let len = text.length;
        
        for (let i = 0; i < len; i++) {
            if (text[i].match(digitsRegex) !== null) {
                periods.push(i + 1);
            }
        }

        return periods;
    }

    #parseAvailableWeeks(text: string) : number[] {
        let weeks = [];
        let len = text.length;

        for (let i = 0; i < len; i++) {
            if (text[i].match(digitsRegex) !== null) {
                weeks.push(i + 1);
            }
        }

        return weeks;
    }
}