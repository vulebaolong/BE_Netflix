const responsesHelper = require("../helpers/responsesHelper");
const CumRapModel = require("../models/cumRapModel");
const LichChieuModel = require("../models/lichChieuModel");
const MovieModel = require("../models/movieModel");

const taoLichChieu = async (maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe) => {
    // const newData = { maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe };

    const movie = await MovieModel.findById(maPhim_ID);
    const cumrap = await CumRapModel.findOne({ maCumRap: maCumRap_ID });

    if (!movie) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy phim");
    if (!cumrap) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy cum rạp");

    const lichChieu = await LichChieuModel.create({ maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe });

    // Cập nhật dữ liệu cho các bản ghi phim
    await MovieModel.updateMany({ _id: maPhim_ID }, { $push: { lichChieuTheoPhim: lichChieu } });

    // Cập nhật dữ liệu cho các bản ghi cụm rạp
    await CumRapModel.updateMany({ maCumRap: maCumRap_ID }, { $push: { lichChieuTheoCumRap: lichChieu } });

    return responsesHelper(200, "Xử Lý Thành Công", "OKE");
};
module.exports = {
    taoLichChieu,
};
