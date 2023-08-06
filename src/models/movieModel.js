const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        tenPhim: { type: String, trim: true, unique: true },
        trailer: { type: String, trim: true },
        moTa: { type: String, trim: true },
        ngayKhoiChieu: { type: String, trim: true },
        dangChieu: { type: Boolean },
        sapChieu: { type: Boolean },
        hot: { type: Boolean },
        danhGia: { type: Number },
        hinhAnh: { type: String, trim: true },
        tenHinhAnh: { type: String, trim: true },
        lichChieuTheoPhim: {
            type: [Object],
            default: [],
        },
    },
    {
        collection: "movies",
        timestamps: true,
    }
);

// Tạo model User dựa trên schema đã định nghĩa
const MovieModel = mongoose.model("Movie", movieSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = MovieModel;
