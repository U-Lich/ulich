import ScheduleForm from "./components/ScheduleForm";
import { UserManual } from "./UserManual";
import "./index.css";

const App = () => {
  return (
    <div className="flex flex-col items-center bg-secondary">
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-main">
        <span className="decoration-3 inline-block text-center align-middle font-serif text-9xl italic text-black underline decoration-sky-500">
          ulich
        </span>
        <ScheduleForm />
        <div className="invisible absolute bottom-5 flex flex-row items-center gap-1 tall:visible">
          <img src="./arrow.svg" className="m-1 w-7" />
          <span className="m-1 text-sm font-bold italic">
            đọc kĩ hướng dẫn sử dụng
            <br />
            trước khi dùng nhé!
          </span>
        </div>
      </div>
      {/* section divider */}
      <img src="./divider.svg" className="min-w-full" />
      <UserManual />
    </div>
  );
};

export default App;
