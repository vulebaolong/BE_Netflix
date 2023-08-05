const mongoose = require("mongoose");

const DatVeSchema = new mongoose.Schema(
    {
        user_ID: { type: String, trim: true },
        thongTinDatVe: [Object],
    },
    {
        collection: "DatVe",
        timestamps: true,
    }
);

// Tạo model User dựa trên schema đã định nghĩa
const DatVeModel = mongoose.model("DatVe", DatVeSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = DatVeModel;
