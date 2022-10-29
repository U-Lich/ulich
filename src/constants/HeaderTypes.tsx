import { ScheduleHeaders } from "../components/Schedule";

export const HEADER_TYPES: ScheduleHeaders = {
    cOrder: {
        key: "order",
        validity: false,
        value: ["tt", "TT", "stt", "STT", "Số TT", "Số Thứ Tự", "Số thứ tự", "So TT", "So Thu Tu", "So thu tu", "Soá TT", "Soá Thöù Töï", "Soá thöù töï", "Số TT", "Số Thứ Tự", "Số thứ tự"]
    },
    cId: {
        key: "id",
        validity: false,
        value: ["LHP", "Lớp HP", "Lớp Học Phần", "Lớp học phần", "Lop HP", "Lop Hoc Phan", "Lop hoc phan", "Lôùp HP", "Lôùp Hoïc Phaàn", "Lôùp hoïc phaàn", "Lớp HP", "Lớp Học Phần", "Lớp học phần"]
    },
    cGroup: {
        key: "group",
        validity: false,
        value: ["NTL", "Nhóm TL", "Nhóm Thảo Luận", "Nhóm thảo luận", "Nhom TL", "Nhom Thao Luan", "Nhom thao luan", "Nhoùm TL", "Nhoùm Thaûo Luaän", "Nhoùm thaûo luaän", "Nhóm TL", "Nhóm Thảo Luận", "Nhóm thảo luận"]
    },
    cName: {
        key: "name",
        validity: false,
        value: ["THP", "Tên HP", "Tên Học Phần", "Tên học phần", "Ten HP", "Ten Hoc Phan", "Ten hoc phan", "Teân HP", "Teân Hoïc Phaàn", "Teân hoïc phaàn", "Tên HP", "Tên Học Phần", "Tên học phần"]
    },
    cType: {
        key: "type",
        validity: false,
        value: ["LHP", "Loại HP", "Loại Học Phần", "Loại học phần", "Loai HP", "Loai Hoc Phan", "Loai hoc phan", "Loaïi HP", "Loaïi Hoïc Phaàn", "Loaïi hoïc phaàn", "Loại HP", "Loại Học Phần", "Loại học phần"]
    },
    cDates: {
        key: "dates",
        validity: false,
        value: ["Thứ", "Thu", "Thöù", "Thứ"]
    },
    cPeriods: {
        key: "periods",
        validity: false,
        value: ["Tiết", "Tiet", "Tieát", "Tiết"]
    },
    cRoom: {
        key: "room",
        validity: false,
        value: ["Phòng", "Phong", "Phoøng", "Phòng"]
    },
    cWeeks: {
        key: "weeks",
        validity: false,
        value: ["Tuần học", "Tuan hoc", "Tuaàn hoïc", "Tuần học"]
    }
};