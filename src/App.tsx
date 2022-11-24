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
      <div className="flex w-full flex-col gap-5 bg-secondary text-white xl:w-3/5">
        <h1 className="my-4 w-fit self-center p-6">hướng dẫn sử dụng</h1>
        <div className="h-8"></div>
        <div className="contentbox">
          <h2>Mẫu thời khóa biểu được hỗ trợ</h2>
          <img
            src="/figure_02_00.svg"
            className="m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
          ></img>
        </div>
        <div className="contentbox">
          <h2>Tóm tắt các bước sử dụng</h2>
          <div className="flex flex-col xl:flex-row">
            <img
              src="/leaflet.svg"
              className="m-4 w-60 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
            />
            <div className="grow p-4">
              <ol className="list-disc px-5">
                <li>
                  <b>Bước 1: Sao chép và dán thời khóa biểu theo hướng dẫn.</b>
                  <ol className="list-square px-5">
                    <li>
                      Sao chép <code>ctrl + c</code> <b>chỉ</b> bảng thời khóa
                      biểu trong bảng tính Excel từ nhà trường.
                    </li>
                    <li>
                      Dán <code>ctrl + v</code> thời khóa biểu vừa được sao chép
                      vào ô 1.
                    </li>
                  </ol>
                </li>
                <li className="pt-4">
                  <b>Bước 2: Chọn ngày bắt đầu tuần đầu tiên của học kỳ.</b>
                  <ol className="list-square px-5">
                    <li>
                      Ghi nhận ngày bắt đầu tuần đầu tiên của học kỳ từ bảng
                      tính Excel.
                    </li>
                    <li>
                      Nhập ngày <b>thứ hai</b> của tuần đó vào ô thử 2.
                    </li>
                  </ol>
                </li>
                <li className="pt-4">
                  <b>Bước 3: Nhấn nút [Chuyển] để bắt đầu chuyển đổi.</b>
                  <ol className="list-square px-5">
                    <li>
                      Nếu thành công, file sẽ được tải về máy. Nếu không, hãy
                      kiểm tra bảng [Trạng thái] để tìm hiểu và sửa lỗi nếu có
                      thể.
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 transition-all md:grid-cols-2">
          <div className="contentbox row-span-4">
            <h2>Các lỗi thường gặp phải và cách khắc phục</h2>
          </div>
          <div className="contentbox p-2">
            <h2>
              Bảng thời khóa biểu được sao chép tại bước 1 phải có các cột như
              hình sau.
            </h2>
          </div>
          <div className="contentbox p-4  transition-all hover:scale-105">
            <img
              src="/figure_02_01.svg"
              className="rounded-lg ring-8 ring-accent-bright ring-offset-2"
              alt="Quy định bảng thời khóa biểu cần sao chép tại bước 1."
            />
          </div>
          <div className="contentbox p-2">
            <h2>
              Ngày bắt đầu tuần đầu tiên của học kỳ được sao chép tại bước 2
              phải là ngày thứ hai của tuần đó.
            </h2>
          </div>
          <div className="contentbox p-4">
            <img
              src="/figure_02_02.svg"
              className="rounded-lg ring-8 ring-accent-bright ring-offset-2"
              alt="Ngày bắt đầu tuần đầu tiên của học kỳ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
