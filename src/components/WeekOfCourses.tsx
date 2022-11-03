import Course from "./Course";

class WeekOfCourses {
    static MAX_NUM_PERIODS = 12;

    static #dotw = [
        {name: "Thứ Hai", value: 0},
        {name: "Thứ Ba", value: 1},
        {name: "Thứ Tư", value: 2},
        {name: "Thứ Năm", value: 3},
        {name: "Thứ Sáu", value: 4}
    ];

    weekNumber: number;
    weekDate: Date;
    courses: { 
        [name: string]: Course[],
        "Thứ Hai": [],
        "Thứ Ba": [],
        "Thứ Tư": [],
        "Thứ Năm": [],
        "Thứ Sáu": []
    };

    constructor(week: number, from: Date) {
        this.weekNumber = week;
        this.weekDate = from; // TODO: + something
        this.courses = {
            "Thứ Hai": [],
            "Thứ Ba": [],
            "Thứ Tư": [],
            "Thứ Năm": [],
            "Thứ Sáu": []
        };
    }

    ToArray(): any[] {
        let weekArray = new Array(WeekOfCourses.MAX_NUM_PERIODS);
    
        let shiftEq = (x: number) => {return (2 * x + 2 - ( 1 + Math.pow(-1, x))) / 4};

        let tempWeek = new Date(this.weekDate);
        let weekTo = new Date(tempWeek.setDate(tempWeek.getDate() + 4));

        for (let i = 0; i < WeekOfCourses.MAX_NUM_PERIODS; i++) {
            weekArray[i] = [];
            weekArray[i][0] = String(this.weekNumber) + '\n' + this.weekDate.toISOString().substring(0, 10) + '\n' + '-' + '\n' + weekTo.toISOString().substring(0, 10);
            weekArray[i][1] = String(shiftEq(i + 1));

            for (let day of WeekOfCourses.#dotw) {

                weekArray[i][day.value + 2] = "";

                for (let course of this.courses[day.name]) {

                    if (course.periods.includes(i + 1)) {
                        weekArray[i][day.value + 2] = String(course.name) + (course.type === "Thảo luận" ? " (TL)" : "");
                    }
                }
            }
        }
        return weekArray;
    }

    ToMergedRange() {
        let startRow = 13 * this.weekNumber - 11; // x + 1 + 12 * (x - 1 )
        let arr = [{
            s: { r: startRow, c: 0 },
            e: { r: startRow + WeekOfCourses.MAX_NUM_PERIODS - 1, c: 0 }
        }];

        for (let i = 0; i < WeekOfCourses.MAX_NUM_PERIODS; i += 2) {
            arr.push({
                s: { r: i + startRow, c: 1 },
                e: { r: i + startRow + 1, c: 1 }
            });
        }
        return arr;
    }

    RowIterator() {
        let nextRow = 13 * this.weekNumber - 12;

        const rangeIterator = {
            begin: {
                s: { r: nextRow, c: 0 },
                e: { r: nextRow, c: 6 }
            },

            end: null,

            next() {
                let result;
                if (nextRow < WeekOfCourses.MAX_NUM_PERIODS) {
                    result = {
                        s: { r: nextRow, c: 0 },
                        e: { r: nextRow, c: 6 }
                    };

                    nextRow += 1;
                    return result;
                }

                return null;
            }
        };

        return rangeIterator;
    }
}

export default WeekOfCourses;