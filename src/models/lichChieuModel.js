const mongoose = require("mongoose");

const LichChieuSchema = new mongoose.Schema(
    {
        maPhim_ID: { type: String, trim: true },
        maCumRap_ID: { type: String, trim: true },
        ngayChieuGioChieu: { type: String, trim: true },
        giaVe: { type: Number, trim: true },
        danhSachVe: [Object],
    },
    {
        collection: "LichChieu",
        timestamps: true,
    }
);

// Tạo model User dựa trên schema đã định nghĩa
const LichChieuModel = mongoose.model("LichChieu", LichChieuSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = LichChieuModel;
