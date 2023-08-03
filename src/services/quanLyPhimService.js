const moment = require("moment");
const responsesHelper = require("../helpers/responsesHelper");
const uploadImgHelper = require("../helpers/uploadImgHelper");
const MovieModel = require("../models/movieModel");
function convertToBoolean(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
}

const themPhimUploadHinh = async (file, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia) => {
    if (!tenPhim) return responsesHelper(400, "Thiếu tên phim");
    if (!trailer) return responsesHelper(400, "Thiếu trailer");
    if (!moTa) return responsesHelper(400, "Thiếu mô tả");
    if (!ngayKhoiChieu) return responsesHelper(400, "Thiếu ngày khởi chiếu");
    if (!dangChieu) return responsesHelper(400, "Thiếu trạng thái đang chiếu");
    if (!sapChieu) return responsesHelper(400, "Thiếu trạng thái sắp chiếu");
    if (!hot) return responsesHelper(400, "Thiếu trạng thái hot");
    if (!danhGia) return responsesHelper(400, "Thiếu trạng thái đánh giá");

    dangChieu = convertToBoolean(dangChieu);
    sapChieu = convertToBoolean(sapChieu);
    hot = convertToBoolean(hot);
    danhGia = +danhGia;
    ngayKhoiChieu = moment(ngayKhoiChieu, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss");

    const exitMove = MovieModel.findOne({tenPhim})
    if (exitMove !== null) return responsesHelper(400, "Phim đã tồn tại");

    const hinhAnh = await uploadImgHelper(file);

    const movie = await MovieModel.create({ tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia, hinhAnh });

    return responsesHelper(200, "Xử lý thành công", {
        maPhim: movie._id,
        tenPhim: movie.tenPhim,
        trailer: movie.trailer,
        moTa: movie.moTa,
        ngayKhoiChieu: movie.ngayKhoiChieu,
        dangChieu: movie.dangChieu,
        sapChieu: movie.sapChieu,
        hot: movie.hot,
        danhGia: movie.danhGia,
        hinhAnh: movie.hinhAnh,
    });
};

module.exports = {
    themPhimUploadHinh,
};
