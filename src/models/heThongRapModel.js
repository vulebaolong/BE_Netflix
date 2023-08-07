const mongoose = require("mongoose");

const HeThongRapSchema = new mongoose.Schema(
    {
        maHeThongRap: { type: String, trim: true },
        tenHeThongRap: { type: String, trim: true },
        logo: { type: String, trim: true },
    },
    {
        collection: "HeThongRap",
        timestamps: true,
    }
);

// Tạo model User dựa trên schema đã định nghĩa
const HeThongRapModel = mongoose.model("HeThongRap", HeThongRapSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = HeThongRapModel;
