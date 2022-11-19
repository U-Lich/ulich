import { saveAs } from "file-saver";
import React from "react";
import { Schedule } from "./Schedule";
import { PASTEBIN_MESSAGE } from "../constants/FormDefaultValues";
import GenerateSpreadsheet from "./SpreadsheetProccessor";
import "../index.css";
import { UlichException } from "./UlichException";

export default function ScheduleForm() {
  const BLOB_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  let scheduleObj = new Schedule();

  const [startDate, setStartDate] = React.useState(scheduleObj.DateToString());
  const [rawPastebin, setRawPastebin] = React.useState(PASTEBIN_MESSAGE);
  const [scriptOutput, setScriptOutput] = React.useState(
    "Ấn nút [Convert] trên để chuyển đổi thời khóa biểu"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    scheduleObj.rawPastebin = rawPastebin;
    scheduleObj.startDate = new Date(startDate);

    try {
      scheduleObj.ParseRawULAWSchedule();
      setScriptOutput("Schedule successfully parsed!");
      GenerateSpreadsheet(scheduleObj)
        .xlsx.writeBuffer()
        .then((data) => {
          let blob = new Blob([data], { type: BLOB_TYPE });
          saveAs(blob, "schedule.xlsx");
        });
    } catch (error) {
      if (error instanceof UlichException) {
        setScriptOutput(error.message);
      } else {
        setScriptOutput("Fatal error occured! Report this to the developer!");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <textarea
          className="resize-none self-stretch rounded-lg border-2 border-dashed border-gray-600 bg-white px-4 py-2 text-center outline-none transition-all hover:scale-105 focus:scale-105 focus:outline-none"
          value={rawPastebin}
          name="rawPastebin"
          onChange={(event) => setRawPastebin(event.target.value)}
          placeholder={PASTEBIN_MESSAGE}
          required={true}
          rows={1}
        />
        <div className="flex h-14 flex-row gap-2 self-stretch">
          <input
            className="basis-2/3 self-stretch rounded-lg border-2 border-solid border-black bg-white px-5 transition-all hover:scale-105 focus:scale-105"
            value={startDate}
            type="date"
            name="startDate"
            onChange={(event) => setStartDate(event.target.value)}
          />
          <button
            className="basis-1/3 self-stretch rounded-lg bg-black p-2 text-white transition-all hover:scale-105 focus:scale-105"
            type="submit"
          >
            Convert
          </button>
        </div>
      </form>
      <div className="rounded-lg">
        <details className="group rounded-lg bg-gray-100">
          <summary className="flex h-min cursor-pointer list-none flex-row justify-between rounded-lg bg-gray-100 p-4 text-center font-bold transition-all group-open:bg-gray-200">
            <div className="">Conversion output</div>
            <div className="h-2/3 self-center border-8 border-transparent border-l-black transition-transform group-open:translate-y-1 group-open:rotate-90"></div>
          </summary>
          <div className=" h-40 w-64 self-stretch overflow-y-scroll rounded-lg px-5 py-2">
            {scriptOutput}
          </div>
        </details>
      </div>
    </div>
  );
}
