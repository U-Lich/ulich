import { saveAs } from 'file-saver';
import React from 'react';
import { Schedule } from './Schedule';
import { PASTEBIN_MESSAGE } from '../constants/FormDefaultValues';
import GenerateSpreadsheet from './SpreadsheetProccessor';
import '../index.css';



export default class ScheduleForm extends React.Component {
    blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    scheduleObj: Schedule;
    state: {
        startDate: string,
        rawPastebin: string
    };

    constructor(props: any) {
        super(props);

        this.scheduleObj = new Schedule();

        this.state = {
            startDate: this.scheduleObj.startDate.toISOString().substring(0, 10),
            rawPastebin: this.scheduleObj.rawPastebin
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
        
        this.scheduleObj.rawPastebin = this.state.rawPastebin;
        this.scheduleObj.startDate = new Date(this.state.startDate);

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
            <form onSubmit={this.handleSubmit} className="self-stretch flex flex-col gap-5 items-center">
                <textarea 
                    className="self-stretch resize-none bg-white border-dashed border-2 hover:scale-105 focus:scale-105 focus:outline-none outline-none transition-all border-gray-600 rounded-lg px-4 py-2" 
                    value={this.state.rawPastebin}
                    name="rawPastebin"
                    onChange={this.handleChange} 
                    placeholder={PASTEBIN_MESSAGE}/>
                <div className="self-stretch flex flex-row h-14 gap-2">
                    <input
                        className="self-stretch bg-white basis-2/3 border-solid border-2 border-black rounded-lg px-5 hover:scale-105 focus:scale-105 transition-all"
                        value={this.state.startDate}
                        type="date"
                        name="startDate"
                        onChange={this.handleChange}/>
                    <button 
                        className="self-stretch duration-300 bg-black text-white rounded-lg basis-1/3 p-2 hover:scale-105 focus:scale-105 transition-all" 
                        type="submit">
                        Convert
                    </button>
                </div>
            </form>
        );
    }
}