import { saveAs } from 'file-saver';
import React from 'react';
import Schedule from './Schedule';
import FormDefaultValues from '../constants/FormDefaultValues.json';
import GenerateSpreadsheet from './SpreadsheetProccessor';

export default class ScheduleForm extends React.Component {
    blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    scheduleObj: Schedule;
    state: {
        tableName: string,
        rawPastebin: string
    };

    constructor(props: any) {
        super(props);

        this.scheduleObj = new Schedule();

        this.state = {
            tableName: FormDefaultValues.table_name,
            rawPastebin: FormDefaultValues.raw_pastebin
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        this.scheduleObj.scheduleName = this.state.tableName;
        this.scheduleObj.rawPastebin = this.state.rawPastebin;

        if (this.scheduleObj.ParseRawULAWSchedule()) {
            let workbook = GenerateSpreadsheet(this.scheduleObj);
            if (workbook != null) {
                workbook.xlsx.writeBuffer().then(data => {
                    const blob = new Blob([data], { type: this.blobType });
                    saveAs(blob, "Summary.xlsx");
                });
            }
        } else {
            // TODO: Generate exception pop up if false
            alert("Unimplemented exception message: 'Parse schedule failed, check console!'");
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <textarea className="paste-area" value={this.state.tableName}       name="tableName"    onChange={this.handleChange}/>
                <textarea className="paste-area" value={this.state.rawPastebin}     name="rawPastebin"    onChange={this.handleChange}/>
                <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}