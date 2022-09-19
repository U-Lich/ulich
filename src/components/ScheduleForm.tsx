import { writeFile } from 'sheetjs-style';
import React from 'react';
import Schedule from './Schedule';
import FormDefaultValues from '../constants/FormDefaultValues.json';
import { ToUnicode } from './VniConverter';

export default class ScheduleForm extends React.Component {
    scheduleObj: Schedule;
    state: {
        tableName: string,
        courseName: string,
        courseType: string,
        courseDay: string,
        coursePeriod: string,
        courseWeek: string
    };

    constructor(props: any) {
        super(props);

        this.scheduleObj = new Schedule();

        this.state = {
            tableName: FormDefaultValues.table_name,
            courseName: FormDefaultValues.course_name,
            courseType: FormDefaultValues.course_type,
            courseDay: FormDefaultValues.course_day,
            coursePeriod: FormDefaultValues.course_period,
            courseWeek: FormDefaultValues.course_week
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const target = event.target;
        const value = ToUnicode(target.value);
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        this.scheduleObj.scheduleName = this.state.tableName;

        this.scheduleObj.rawData.courseName = this.state.courseName;
        this.scheduleObj.rawData.courseType = this.state.courseType;
        this.scheduleObj.rawData.courseDay = this.state.courseDay;
        this.scheduleObj.rawData.coursePeriod = this.state.coursePeriod;
        this.scheduleObj.rawData.courseWeek = this.state.courseWeek;

        let workbook = this.scheduleObj.ParseRawULAWSchedule();
        if (workbook != null) {
            console.log(workbook);
            writeFile(workbook, "Summary.xlsx");
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <textarea className="paste-area" value={this.state.tableName}     name="tableName"    onChange={this.handleChange}/>
                </form>
                <form onSubmit={this.handleSubmit}>
                <textarea className="paste-area" value={this.state.courseName}    name="courseName"   onChange={this.handleChange}/>
                <textarea className="paste-area" value={this.state.courseType}    name="courseType"   onChange={this.handleChange}/>
                <textarea className="paste-area" value={this.state.courseDay}     name="courseDay"    onChange={this.handleChange}/>
                <textarea className="paste-area" value={this.state.coursePeriod}  name="coursePeriod" onChange={this.handleChange}/>
                <textarea className="paste-area" value={this.state.courseWeek}    name="courseWeek"   onChange={this.handleChange}/>
                <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}