import ScheduleForm from './components/ScheduleForm';
import './index.css';

const App = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-default-bright min-h-screen flex justify-center items-center flex-col gap-10">
        <span className="inline-block text-9xl underline italic decoration-sky-500 decoration-3 font-serif text-black text-center align-middle">ulich</span>
        <ScheduleForm/>
        <div className="absolute bottom-5 flex flex-row items-center gap-1">
          <img src="/arrow.svg" className="w-7 m-1"/>
          <span className="italic font-bold m-1 text-sm">đọc kĩ hướng dẫn sử dụng<br/>trước khi dùng nhé!</span>
        </div>
      </div>
      <div className="h-20"></div>
      <div className=" w-4/5 mt-5 flex flex-col gap-5">
        <h1 className="text-4xl font-bold decoration-sky-500 decoration-4 underline my-4 bg-black text-white rounded-lg w-fit self-center p-6">Hướng dẫn sử dụng</h1>
        <div className="flex flex-col m-2 py-4 px-6 bg-white border-solid border-black border-4 rounded-xl">
          <h2>Mẫu thời khóa biểu được công cụ hỗ trợ</h2>
          <img src="/Figure_02_00.svg" className="w-full m-4 self-center"></img>
        </div>
        <div className="flex flex-col m-2 py-4 px-6 bg-white border-solid border-black border-4 rounded-xl">
          <h2>Tóm tắt các bước sử dụng công cụ</h2>
          <img src="/leaflet.svg" className=" w-3/4 m-4 self-center pr-20"/>
          <div className="text-justify">
            <ol className="list-disc px-5">
              <li>
                <span className="inline-block font-bold">Bước 1:</span> Sao chép và dán thời khóa biểu theo hướng dẫn.
              </li>
              <li>
                <span className="inline-block font-bold">Bước 2:</span> Chọn ngày <span className=" font-bold">thứ hai đầu tuần</span> khi thời khóa biểu bắt đầu được áp dụng.
              </li>
              <li>
                <span className="inline-block font-bold">Bước 3:</span> Nhấn nút để bắt đầu chuyển đổi.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col m-2 py-4 px-6 bg-white border-solid border-black border-4 rounded-xl">
          <h2>Bước 1</h2>
          <img src="/Figure_02_01.svg" className="w-full m-4 self-center"></img>
          <ol className="list-disc px-5">
            <li>
              Sao chép <code>ctrl+c</code> <b>chỉ</b> bảng thời khóa biểu từ bảng tính Excel từ nhà trường.
            </li>
            <li>
              Dán <code>ctrl+v</code> thời khóa biểu vừa được sao chép vào ô 1.
            </li>
          </ol>
        </div>
        <div className="flex flex-col m-2 py-4 px-6 bg-white border-solid border-black border-4 rounded-xl">
          <h2 className="text-xl font-bold">Bước 2</h2>
          <img src="/Figure_02_02.svg" className="w-full m-4 self-center"></img>
          <ol className="list-disc px-5">
            <li>
              Ghi nhận tuần thời khóa biểu bắt đầu có hiệu lực.
            </li>
            <li>
              Nhập ngày <b>thứ hai</b> của tuần đã ghi nhận vào ô 2.
            </li>
          </ol>
        </div>
        <div className="flex flex-col m-2 py-4 px-6 bg-white border-solid border-black border-4 rounded-xl">
          <h2>Bước 3</h2>
          <span className="inline-block text-justify">Ấn ô/nút 3 để bắt đầu chuyển đổi.</span>
          <span className="inline-block text-justify"><b>Các lỗi thường thấy và cách khắc phục:</b></span>
          <ol className="list-disc px-5">
            <li>
              Input one here
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App;