import { useState } from "react";

export const UserManual = () => {
  return (
    <div className="flex w-full flex-col gap-5 bg-secondary text-white xl:w-3/5">
      <h1 className="my-4 w-fit self-center p-6">hướng dẫn sử dụng</h1>
      <div className="h-8"></div>
      <div className="contentbox">
        <h2>Mẫu thời khóa biểu được hỗ trợ</h2>
        <img
          src="./figure_02_00.svg"
          className="m-4 w-11/12 self-center rounded-lg ring-8 ring-accent-bright ring-offset-2"
        ></img>
      </div>
      <div className="contentbox">
        <h2>Tóm tắt các bước sử dụng</h2>
        <div className="flex flex-col xl:flex-row">
          <img
            src="./leaflet.svg"
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
                    Ghi nhận ngày bắt đầu tuần đầu tiên của học kỳ từ bảng tính
                    Excel.
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
                    Nếu thành công, file sẽ được tải về máy. Nếu không, hãy kiểm
                    tra bảng [Trạng thái] để tìm hiểu và sửa lỗi nếu có thể.
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="contentbox">
          <h2>Các lỗi thường gặp phải và cách khắc phục</h2>
          <div className="h-fit w-full overflow-scroll">
            <div className="h-full w-384 lg:w-full">
              <table className="mx-8 my-2 h-fit table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 border border-slate-700 bg-slate-800 py-2 font-bold">
                      Lỗi
                    </th>
                    <th className="w-48 border border-slate-700 bg-slate-800 py-2 font-bold">
                      Biểu hiện
                    </th>
                    <th className="w-96 border border-slate-700 bg-slate-800 py-2 font-bold">
                      Nguyên nhân
                    </th>
                    <th className="w-96 border border-slate-700 bg-slate-800 py-2 font-bold">
                      Cách khắc phục
                    </th>
                  </tr>
                  k
                </thead>
                <tbody className="align-top">
                  <tr>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-4">
                      InvalidDataTypeError
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-4">
                      "Thiếu các tiêu đề quan trọng", "Không thể tìm được tiêu
                      đề".
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-4">
                      Hàng đầu tiên đầu tiên của trang tính là hàng tiêu đề. Khi
                      đọc các cột trong hàng này, công cụ không tìm được một
                      trong các tiêu đề quan trọng: Tên học phần, Thứ, Tiết,
                      Tuần học, Loại học phần. Có thể do các tiêu đề này không
                      xuất hiện trong bảng tính hoặc không được viết đúng chính
                      tả.
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-4">
                      Kiểm tra lại bảng tính và đảm bảo rằng các tiêu đề quan
                      trọng được viết đúng chính tả.
                      <ol className="list-inside list-disc">
                        <li className="my-2">
                          Nếu tiêu đề có tồn tại trong trang tính của trường
                          nhưng công cụ báo lỗi, không đọc được. Type lại với
                          trình type tiếng Việt sử dụng "Character set" Unicode.
                        </li>
                        <li className="mb-2">
                          Nếu tiêu đề không tồn tại trong trang tính của trường.
                          Chèn 1 cột tại vị trí bất kì của trang tính gốc. Với
                          mỗi hàng của cột nhập giá trị mặt định của tiêu đề.
                        </li>
                      </ol>
                      <b>Xem thêm bảng tiêu đề mẫu tại đây.</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      InvalidDataTypeError
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      "Tìm thấy dữ liệu không hợp lệ".
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      Tại mỗi hàng sau hàng tiêu đề, mỗi cột của hàng chứa dữ
                      liệu tương ứng với tiêu đề của cột đó. Dữ liệu tại cột
                      đang đọc không giống như dự tính. Có thể do dữ liệu bị lỗi
                      hoặc không được định dạng đúng.
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      Kiểm tra lại bảng tính và đảm bảo rằng dữ liệu tại mỗi
                      hàng của cột phát hiện lỗi là phù hợp với định dạng đã
                      được quy định trong bảng tiêu đề mẫu.
                      <ol className="list-inside list-disc">
                        <li className="my-2">
                          Nếu cột bị lỗi là các cột chứa dữ liệu chỉ có thể là
                          các từ ngữ được định sẵn (cột Thứ, cột Loại học phần)
                        </li>
                        <li className="mb-2">
                          Nếu dữ liệu không được định dạng đúng, đảm bảo rằng dữ
                          liệu tại hàng đó được định dạng đúng với định dạng đã
                          được quy định trong bảng tiêu đề mẫu.
                        </li>
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      FatalError
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      "Thiếu các tiêu đề quan trọng", "Không thể tìm được tiêu
                      đề"
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      Công cụ không tìm được một trong các tiêu đề quan trọng:
                      Tên học phần, Thứ, Tiết, Tuần học, Loại học phần
                    </td>
                    <td className="border border-slate-700 bg-slate-800 bg-opacity-40 px-4 py-2">
                      Công cụ không tìm được một trong các tiêu đề quan trọng:
                      Tên học phần, Thứ, Tiết, Tuần học, Loại học phần, Công cụ
                      không tìm được một trong các tiêu đề quan trọng: Tên học
                      phần, Thứ, Tiết, Tuần học, Loại học phần
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="contentbox p-2">
          <h2>
            Bảng thời khóa biểu được sao chép tại bước 1 phải có các cột như
            hình sau.
          </h2>
        </div>
        <div className="contentbox p-4 transition-all">
          <img
            src="./figure_02_01.svg"
            className="rounded-lg ring-8 ring-accent-bright ring-offset-2"
            alt="Quy định bảng thời khóa biểu cần sao chép tại bước 1."
          />
        </div>
        <div className="contentbox p-2">
          <h2>
            Ngày bắt đầu tuần đầu tiên của học kỳ được sao chép tại bước 2 phải
            là ngày thứ hai của tuần đó.
          </h2>
        </div>
        <div className="contentbox p-4">
          <img
            src="./figure_02_02.svg"
            className="rounded-lg ring-8 ring-accent-bright ring-offset-2"
            alt="Ngày bắt đầu tuần đầu tiên của học kỳ"
          />
        </div>
      </div>
    </div>
  );
};
