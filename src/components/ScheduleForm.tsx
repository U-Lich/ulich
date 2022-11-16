import { saveAs } from "file-saver";
import React from "react";
import { Schedule } from "./Schedule";
import { PASTEBIN_MESSAGE } from "../constants/FormDefaultValues";
import GenerateSpreadsheet from "./SpreadsheetProccessor";
import "../index.css";

export default class ScheduleForm extends React.Component {
  blobType: string =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  scheduleObj: Schedule;
  state: {
    startDate: string;
    rawPastebin: string;
  };

  constructor(props: any) {
    super(props);

    this.scheduleObj = new Schedule();

    this.state = {
      startDate: this.scheduleObj.startDate.toISOString().substring(0, 10),
      rawPastebin: this.scheduleObj.rawPastebin,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();

    this.scheduleObj.rawPastebin = this.state.rawPastebin;
    this.scheduleObj.startDate = new Date(this.state.startDate);

    if (this.scheduleObj.ParseRawULAWSchedule()) {
      let workbook = GenerateSpreadsheet(this.scheduleObj);
      if (workbook != null) {
        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], { type: this.blobType });
          saveAs(blob, "Summary.xlsx");
        });
      }
    } else {
      // TODO: Generate exception pop up if false
      alert(
        "Unimplemented exception message: 'Parse schedule failed, check console!'"
      );
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <textarea
          className="resize-none self-stretch rounded-lg border-2 border-dashed border-gray-600 bg-white px-4 py-2 outline-none transition-all hover:scale-105 focus:scale-105 focus:outline-none"
          value={this.state.rawPastebin}
          name="rawPastebin"
          onChange={this.handleChange}
          placeholder={PASTEBIN_MESSAGE}
        />
        <div className="flex h-14 flex-row gap-2 self-stretch">
          <input
            className="basis-2/3 self-stretch rounded-lg border-2 border-solid border-black bg-white px-5 transition-all hover:scale-105 focus:scale-105"
            value={this.state.startDate}
            type="date"
            name="startDate"
            onChange={this.handleChange}
          />
          <button
            className="basis-1/3 self-stretch rounded-lg bg-black p-2 text-white transition-all hover:scale-105 focus:scale-105"
            type="submit"
          >
            Convert
          </button>
        </div>
      </form>
    );
  }
}
