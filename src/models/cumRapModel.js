const mongoose = require("mongoose");

const CumRapSchema = new mongoose.Schema(
    {
        maHeThongRap_ID: { type: String, trim: true },
        maCumRap: { type: String, trim: true },
        tenCumRap: { type: String, trim: true },
        diaChi: { type: String, trim: true },
        hinhAnh: { type: String, trim: true },
        lichChieuTheoCumRap: {
            type: [Object],
            default: [],
        },
    },
    {
        collection: "CumRap",
        timestamps: true,
    }
);

// Tạo model User dựa trên schema đã định nghĩa
const CumRapModel = mongoose.model("CumRap", CumRapSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = CumRapModel;
