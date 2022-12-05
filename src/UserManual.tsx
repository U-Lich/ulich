export const UserManual = () => {
  return (
    <div className="flex w-full flex-col gap-5 bg-secondary text-white xl:w-4/6">
      <h1 className="my-4 w-fit self-center p-6">hướng dẫn sử dụng</h1>
      <div className="h-8"></div>
      <div className="contentbox px-0 pb-0">
        <h2>Mẫu thời khóa biểu được hỗ trợ</h2>
        <span className="mb-4 inline-block text-center italic">
          (Hiện tại ulich chỉ hỗ trợ thời khóa biểu chính quy có cấu hình như
          sau)
        </span>
        <img
          src="./figure_02_00.svg"
          className="mt-1 w-full self-center rounded-3xl"
        ></img>
      </div>
      <div className="contentbox">
        <h2>Tóm tắt các bước sử dụng</h2>
        <div className="flex flex-col xl:flex-row">
          <img
            src="./leaflet.svg"
            className="m-4 w-60 self-center rounded-xl ring-8 ring-accent-bright ring-offset-2"
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
      <div className="contentbox px-0 pb-0">
        <h2>
          Bảng thời khóa biểu được sao chép tại bước 1 phải có các cột như hình
          sau.
        </h2>
        <img
          src="./figure_02_01.svg"
          className="rounded-3xl"
          alt="Quy định bảng thời khóa biểu cần sao chép tại bước 1."
        />
      </div>
      <div className="contentbox px-0 pb-0">
        <h2>
          Ngày bắt đầu tuần đầu tiên của học kỳ được sao chép tại bước 2 phải là
          ngày thứ hai của tuần đó.
        </h2>
        <img
          src="./figure_02_02.svg"
          className="rounded-3xl"
          alt="Ngày bắt đầu tuần đầu tiên của học kỳ"
        />
      </div>
      <div className="contentbox">
        <h2>Các lỗi thường gặp phải và cách khắc phục</h2>
        <div className="flex h-fit w-full justify-center overflow-scroll pb-4 scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-600 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
          <table className="mx-8 my-2 w-[56rem] table-auto border-collapse">
            <thead>
              <tr>
                <th className="w-2/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Lỗi
                </th>
                <th className="w-2/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Biểu hiện
                </th>
                <th className="w-4/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Nguyên nhân
                </th>
                <th className="w-4/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Cách khắc phục
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  InvalidDataTypeError
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  "Thiếu các tiêu đề quan trọng", "Không thể tìm được tiêu đề".
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  Hàng đầu tiên đầu tiên của trang tính là hàng tiêu đề. Khi đọc
                  các cột trong hàng này, công cụ không tìm được một trong các
                  tiêu đề quan trọng: Tên học phần, Thứ, Tiết, Tuần học, Loại
                  học phần. Có thể do các tiêu đề này không xuất hiện trong bảng
                  tính hoặc không được viết đúng chính tả.
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  Kiểm tra lại bảng tính và đảm bảo rằng các tiêu đề quan trọng
                  được viết đúng chính tả.
                  <ol className="list-inside list-disc">
                    <li className="my-2">
                      Nếu tiêu đề có tồn tại trong trang tính của trường nhưng
                      công cụ báo lỗi, không đọc được. Type lại với trình type
                      tiếng Việt sử dụng "Character set" Unicode.
                    </li>
                    <li className="mb-2">
                      Nếu tiêu đề không tồn tại trong trang tính của trường.
                      Chèn 1 cột tại vị trí bất kì của trang tính gốc. Với mỗi
                      hàng của cột nhập giá trị mặt định của tiêu đề.
                    </li>
                  </ol>
                  <b>Tham khảo bảng tiêu đề mẫu.</b>
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  InvalidDataTypeError
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  "Tìm thấy dữ liệu không hợp lệ".
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tại mỗi hàng sau hàng tiêu đề, mỗi cột của hàng chứa dữ liệu
                  tương ứng với tiêu đề của cột đó. Dữ liệu tại cột đang đọc
                  không giống như dự tính. Có thể do dữ liệu bị lỗi hoặc không
                  được định dạng đúng.
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Kiểm tra lại bảng tính và đảm bảo rằng dữ liệu tại mỗi hàng
                  của cột phát hiện lỗi là phù hợp với định dạng đã được quy
                  định trong bảng tiêu đề mẫu.
                  <ol className="list-inside list-disc">
                    <li className="my-2">
                      Nếu cột bị lỗi là các cột chứa dữ liệu chỉ có thể là các
                      từ ngữ được định sẵn (cột Thứ, cột Loại học phần)
                    </li>
                    <li className="mb-2">
                      Nếu dữ liệu không được định dạng đúng, đảm bảo rằng dữ
                      liệu tại hàng đó được định dạng đúng với định dạng đã được
                      quy định trong bảng tiêu đề mẫu.
                    </li>
                  </ol>
                  <b>Tham khảo bảng tiêu đề mẫu.</b>
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  FatalError
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  "Lỗi Fatal đã xảy ra"
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Công cụ gặp một lỗi không thể khắc phục được. Có thể do hệ
                  thống đã bị lỗi hoặc dữ liệu nhập chứa các ký tự không hợp lệ.
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Vui lòng kiểm tra lại dữ liệu nhập có chứa các ký tự không hợp
                  lệ hay không. Nếu không, vui lòng tải tệp được đính kèm lỗi và
                  gửi cho chúng tôi tại ulich.feeback@gmail.com.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="contentbox">
        <h2>Bảng tiêu đề mẫu</h2>
        <div className="flex h-fit w-full justify-center overflow-scroll pb-4 scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-600 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
          <table className="mx-8 my-2 w-[56rem] table-auto border-collapse">
            <thead>
              <tr>
                <th className="w-2/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Tiêu đề
                </th>
                <th className="w-2/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Các tiêu đề cùng nghĩa
                </th>
                <th className="w-2/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Độ cần thiết
                </th>
                <th className="w-3/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Dạng dữ liệu
                </th>
                <th className="w-3/12 border border-white border-opacity-20 bg-white bg-opacity-10 py-2 font-bold">
                  Dữ liệu mặc định
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  Số thứ tự
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  tt <br /> TT <br /> stt <br /> STT <br /> Số TT <br /> Số Thứ
                  Tự <br /> So TT <br /> So Thu Tu <br /> So thu tu <br /> Soá
                  TT <br /> Soá Thöù Töï <br /> Soá thöù töï
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  Không cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  ...
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-4">
                  ...
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Lớp học phần
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  LHP <br /> Lớp HP <br /> Lớp Học Phần <br /> Lop HP <br /> Lop
                  Hoc Phan <br />
                  Lop hoc phan <br /> Lôùp HP <br /> Lôùp Hoïc Phaàn <br /> Lôùp
                  hoïc phaàn
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Không cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Nhóm thảo luận
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  NTL <br /> Nhóm TL <br /> Nhóm Thảo Luận <br /> Nhom TL <br />
                  Nhom Thao Luan <br /> Nhom thao luan <br /> Nhoùm TL <br />
                  Nhoùm Thaûo Luaän <br /> Nhoùm thaûo luaän
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Không cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tên học phần
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  THP <br /> Tên HP <br /> Tên Học Phần <br /> Ten HP <br /> Ten
                  Hoc Phan <br />
                  Ten hoc phan <br /> Teân HP <br /> Teân Hoïc Phaàn <br /> Teân
                  hoïc phaàn
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  [TEXT] <br /> hoặc sử dụng dấu ["] để bao bọc tên có xuống
                  dòng
                  <br /> "[TEXT][NEWLINE][TEXT]"
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  abc def
                  <br /> hoặc <br /> "abc [ENTER] def"
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Loại học phần
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  LHP <br /> Loại HP <br /> Loại Học Phần <br /> Loai HP <br />
                  Loai Hoc Phan <br /> Loai hoc phan <br /> Loaïi HP <br />
                  Loaïi Hoïc Phaàn <br /> Loaïi hoïc phaàn
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  [TEXT] <br /> hoặc sử dụng dấu ["] để bao bọc tên có xuống
                  dòng
                  <br /> "[TEXT][NEWLINE][TEXT]"
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Lý thuyết
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Thứ
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Thu <br /> Thöù
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  [Thứ Hai] <br />
                  [Thứ Ba] <br />
                  [Thứ Tư] <br />
                  [Thứ Năm] <br />
                  [Thứ Sáu] <br />
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Thứ Hai
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tiet <br /> Tieát
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  [1234567890123456] hoặc <br />
                  [----------------] hoặc <br />
                  [---------0-2345-]
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ----------------
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Phòng
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Phong <br /> Phoøng
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Không cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ...
                </td>
              </tr>
              <tr>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tuần học
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Tuan hoc <br /> Tuaàn hoïc
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  Cần thiết
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  [123456789012345678901] hoặc <br />
                  [---------------------] hoặc <br />
                  [1_34567890123456_____]
                </td>
                <td className="border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-2">
                  ---------------------
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
