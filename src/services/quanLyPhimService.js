const moment = require("moment");
const responsesHelper = require("../helpers/responsesHelper");
const { uploadImg, deleteImg } = require("../helpers/ImgHelper");
const MovieModel = require("../models/movieModel");
const HeThongRapModel = require("../models/heThongRapModel");
const CumRapModel = require("../models/cumRapModel");
const LichChieuModel = require("../models/lichChieuModel");
const isFileValidHelper = require("../helpers/isFileValidHelper");
const DatVeModel = require("../models/datVeModel");
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
    const movie = await MovieModel.findByIdAndDelete(maPhim).select("-lichChieuTheoPhim -createdAt -updatedAt -__v");
    await DatVeModel.updateMany(
        {"thongTinDatVe.maPhim_ID": maPhim},
        {"$pull": {"thongTinDatVe": {"maPhim_ID": maPhim}}}
    )
    await LichChieuModel.deleteMany({"maPhim_ID": maPhim})
    // xoá ảnh cũ
    await deleteImg(movie.tenHinhAnh);

    return responsesHelper(200, "Xử lý thành công", movie);
};

const layDanhSachPhim = async () => {
    const movie = await MovieModel.find().select("-lichChieuTheoPhim -createdAt -updatedAt -__v -tenHinhAnh");
    return responsesHelper(200, "Xử lý thành công", movie);
};

const layThongTinPhim = async (maPhim) => {
    const movie = await MovieModel.findById(maPhim).select("-createdAt -updatedAt -__v -lichChieuTheoPhim -tenHinhAnh");
    console.log(movie);
    return responsesHelper(200, "Xử lý thành công", movie);
};

const capNhatPhim = async (file, maPhim, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia) => {
    if (!maPhim) return responsesHelper(400, "Thiếu mã phim");
    if (!tenPhim) return responsesHelper(400, "Thiếu tên phim");
    if (!trailer) return responsesHelper(400, "Thiếu trailer");
    if (!moTa) return responsesHelper(400, "Thiếu mô tả");
    if (!ngayKhoiChieu) return responsesHelper(400, "Thiếu ngày khởi chiếu");
    if (!dangChieu) return responsesHelper(400, "Thiếu trạng thái đang chiếu");
    if (!sapChieu) return responsesHelper(400, "Thiếu trạng thái sắp chiếu");
    if (!hot) return responsesHelper(400, "Thiếu trạng thái hot");
    if (!danhGia) return responsesHelper(400, "Thiếu trạng thái đánh giá");
    console.log(ngayKhoiChieu);
    const movie = await MovieModel.findById(maPhim);
    if (!movie) return responsesHelper(400, "Xử lý không thành công", `Tên phim: ${tenPhim} không tồn tại`);

    let objHinhAnh = {
        hinhAnh: movie.hinhAnh,
        tenHinhAnh: movie.tenHinhAnh,
    };

    // nếu file hình ảnh tồn tại thì mới update hình ảnh
    if (isFileValidHelper(file)) {
        // xoá ảnh cũ
        await deleteImg(movie.tenHinhAnh);

        // thêm ảnh mới
        objHinhAnh = await uploadImg(file);
    }

    // update phim
    const movieUpdate = await MovieModel.findByIdAndUpdate(
        maPhim,
        {
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
        },
        { new: true }
    );

    return responsesHelper(200, "Xử lý thành công", movieUpdate);
};

module.exports = {
    themPhimUploadHinh,
    xoaPhim,
    layDanhSachPhim,
    layThongTinPhim,
    capNhatPhim,
};
