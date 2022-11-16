import ScheduleForm from "./components/ScheduleForm";
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
          <img src="/arrow.svg" className="m-1 w-7" />
          <span className="m-1 text-sm font-bold italic">
            đọc kĩ hướng dẫn sử dụng
            <br />
            trước khi dùng nhé!
          </span>
        </div>
      </div>
      <img src="/divider.svg" className="min-w-full" />
      <div className="flex w-full flex-col gap-5 bg-secondary text-white lg:w-3/5">
        <h1 className="my-4 w-fit self-center p-6">hướng dẫn sử dụng</h1>
        <div className="h-8"></div>
        <div className="contentbox">
          <h2>Mẫu thời khóa biểu được công cụ hỗ trợ</h2>
          <img
            src="/Figure_02_00.svg"
            className="m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
          ></img>
        </div>
        <div className="contentbox">
          <h2>Tóm tắt các bước sử dụng công cụ</h2>
          <img
            src="/leaflet.svg"
            className=" m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
          />
          <div className="px-8 pt-4 text-justify">
            <ol className="list-disc px-5">
              <li>
                <span className="inline-block font-bold">Bước 1:</span> Sao chép
                và dán thời khóa biểu theo hướng dẫn.
              </li>
              <li>
                <span className="inline-block font-bold">Bước 2:</span> Chọn
                ngày <span className=" font-bold">thứ hai đầu tuần</span> khi
                thời khóa biểu bắt đầu được áp dụng.
              </li>
              <li>
                <span className="inline-block font-bold">Bước 3:</span> Nhấn nút
                để bắt đầu chuyển đổi.
              </li>
            </ol>
          </div>
        </div>
        <div className="contentbox">
          <h2>Bước 1</h2>
          <img
            src="/Figure_02_01.svg"
            className="m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
          ></img>
          <div className="px-8 pt-4 text-justify">
            <ol className="list-disc px-5">
              <li>
                Sao chép <code>ctrl+c</code> <b>chỉ</b> bảng thời khóa biểu từ
                bảng tính Excel từ nhà trường.
              </li>
              <li>
                Dán <code>ctrl+v</code> thời khóa biểu vừa được sao chép vào ô
                1.
              </li>
            </ol>
          </div>
        </div>
        <div className="contentbox">
          <h2 className="text-xl font-bold">Bước 2</h2>
          <img
            src="/Figure_02_02.svg"
            className="m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
          ></img>
          <div className="px-8 pt-4">
            <ol className="list-disc px-5">
              <li>Ghi nhận tuần thời khóa biểu bắt đầu có hiệu lực.</li>
              <li>
                Nhập ngày <b>thứ hai</b> của tuần đã ghi nhận vào ô 2.
              </li>
            </ol>
          </div>
        </div>
        <div className="contentbox">
          <h2>Bước 3</h2>
          <div className="px-8 pt-4 text-justify">
            <span className="inline-block text-justify">
              <ol className="list-disc px-5">
                <li>Ấn ô/nút 3 để bắt đầu chuyển đổi.</li>
              </ol>
              <br />
              <b>Các lỗi thường thấy và cách khắc phục:</b> <br />
              <ol className="list-disc px-5">
                <li>Input one here</li>
              </ol>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
