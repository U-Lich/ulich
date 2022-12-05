import { saveAs } from "file-saver";
import React from "react";
import { Schedule } from "./Schedule";
import GenerateSpreadsheet from "./SpreadsheetProccessor";
import "../index.css";
import { UlichError } from "./UlichError";

// Blob type to be used in saveAs
const BLOB_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export default function ScheduleForm() {
  // One schedule object to be used in the whole app
  let scheduleObj = new Schedule();

  // State variables to take care of the user's interaction with the form
  const [startDate, setStartDate] = React.useState(scheduleObj.DateToString());
  const [rawPastebin, setRawPastebin] = React.useState("");
  const [scriptOutput, setScriptOutput] = React.useState(
    "Ấn nút [Convert] trên để chuyển đổi thời khóa biểu"
  );
  const [isAwaiting, setIsAwaiting] = React.useState(true);
  const [isSuccessful, setIsSuccessful] = React.useState(true);

  /**
   * Handles the final step of the conversion process
   * @param event the event that triggered this function
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsAwaiting(false);

    scheduleObj.rawPastebin = rawPastebin;
    scheduleObj.startDate = new Date(startDate);

    try {
      scheduleObj.ParseRawULAWSchedule();
      setScriptOutput("Schedule successfully parsed!");
      setIsSuccessful(true);
      GenerateSpreadsheet(scheduleObj)
        .xlsx.writeBuffer()
        .then((data) => {
          let blob = new Blob([data], { type: BLOB_TYPE });
          saveAs(blob, "schedule.xlsx");
        });
    } catch (error) {
      if (error instanceof UlichError) {
        setScriptOutput(error.message);
        setIsSuccessful(false);
      } else {
        console.log(error);
        console.trace();
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
          className="resize-none self-stretch rounded-lg border-2 border-dashed border-gray-600 bg-white px-4 py-2 outline-none transition-all scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full focus:scale-105 focus:outline-none hover:scale-105"
          value={rawPastebin}
          name="rawPastebin"
          onChange={(event) => {
            setRawPastebin(event.target.value);
            setIsAwaiting(true);
          }}
          placeholder={"Dán thời khóa biểu vào đây"}
          required={true}
          rows={3}
        />
        <div className="flex h-14 flex-row gap-2 self-stretch">
          <input
            className="basis-2/3 self-stretch rounded-lg border-2 border-solid border-black bg-white px-5 transition-all focus:scale-105 hover:scale-105"
            value={startDate}
            type="date"
            name="startDate"
            onChange={(event) => {
              setStartDate(event.target.value);
              setIsAwaiting(true);
            }}
          />
          <button
            className="basis-1/3 self-stretch rounded-lg bg-black p-2 text-white transition-all focus:scale-105 hover:scale-105"
            type="submit"
          >
            Chuyển
          </button>
        </div>
      </form>
      <div className="rounded-lg">
        <details
          className={
            "group rounded-lg border-2 border-solid bg-gray-100 transition-all hover:scale-105 " +
            (!isSuccessful && !isAwaiting ? "border-red-300" : "border-black")
          }
          open={!isSuccessful}
        >
          <summary className="flex h-min cursor-pointer list-none flex-row justify-between rounded-lg bg-gray-100 p-4 text-center font-bold transition-all group-open:bg-gray-200">
            <div className="">Trạng thái</div>
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
