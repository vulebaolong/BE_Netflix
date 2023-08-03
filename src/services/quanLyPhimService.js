const moment = require("moment");
const responsesHelper = require("../helpers/responsesHelper");
const { uploadImg, deleteImg } = require("../helpers/ImgHelper");
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
    if (!file) return responsesHelper(400, "Thiếu hình ảnh");

    dangChieu = convertToBoolean(dangChieu);
    sapChieu = convertToBoolean(sapChieu);
    hot = convertToBoolean(hot);
    danhGia = +danhGia;
    ngayKhoiChieu = moment(ngayKhoiChieu, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss");

    const exitMove = await MovieModel.findOne({ tenPhim });
    if (exitMove) return responsesHelper(400, "Phim đã tồn tại");

    const objHinhAnh = await uploadImg(file);

    const movie = await MovieModel.create({
        tenPhim,
        trailer,
        moTa,
        ngayKhoiChieu,
        dangChieu,
        sapChieu,
        hot,
        danhGia,
        hinhAnh: objHinhAnh.hinhAnh,
        tenHinhAnh: objHinhAnh.tenHinhAnh,
    });

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

const xoaPhim = async (maPhim) => {
    const movie = await MovieModel.findById(maPhim);
    console.log("movie.tenHinhAnh", movie.tenHinhAnh);
    return await deleteImg(movie.tenHinhAnh);
};

const layDanhSachPhim = async () => {
    const movies = await MovieModel.find();
    return responsesHelper(200, "Xử lý thành công", movies);
};

module.exports = {
    themPhimUploadHinh,
    xoaPhim,
    layDanhSachPhim,
};
