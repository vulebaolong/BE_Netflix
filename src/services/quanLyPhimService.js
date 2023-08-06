const moment = require("moment");
const responsesHelper = require("../helpers/responsesHelper");
const { uploadImg, deleteImg } = require("../helpers/ImgHelper");
const MovieModel = require("../models/movieModel");
const HeThongRapModel = require("../models/heThongRapModel");
const CumRapModel = require("../models/cumRapModel");
const LichChieuModel = require("../models/lichChieuModel");
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
    const movies = await MovieModel.find().select("-lichChieuTheoPhim -createdAt -updatedAt -__v -tenHinhAnh");
    return responsesHelper(200, "Xử lý thành công", movies);
};

const changeObj = (item) => {
    return JSON.parse(JSON.stringify(item));
};

const layThongTinLichChieuHeThongRap = async () => {
    const heThongRap = changeObj(await HeThongRapModel.find().select("logo maHeThongRap tenHeThongRap"));

    const result = await Promise.all(
        heThongRap.map(async (item) => {
            item.lstCumRap = changeObj(
                await CumRapModel.find({
                    maHeThongRap_ID: item.maHeThongRap,
                    lichChieuTheoCumRap: { $exists: true, $ne: [] }, // Điều kiện chỉ lấy những document có lichChieuTheoCumRap không rỗng
                }).select("maCumRap tenCumRap diaChi hinhAnh")
            );

            item.lstCumRap = await Promise.all(
                item.lstCumRap.map(async (item2) => {
                    // item2.danhSachPhim = await MovieModel.aggregate([
                    //     // Lọc các documents có maCumRap_ID là "bhd-star-cineplex-3-2"
                    //     { $match: { "lichChieuTheoPhim.maCumRap_ID": item2.maCumRap } },
                    //     // Giữ lại chỉ những phần tử trong mảng lichChieuTheoPhim có maCumRap_ID là "bhd-star-cineplex-3-2"
                    //     {
                    //         $project: {
                    //             dangChieu: 1,
                    //             hinhAnh: 1,
                    //             hot: 1,
                    //             sapChieu: 1,
                    //             tenPhim: 1,
                    //             lichChieuTheoPhim: {
                    //                 $filter: {
                    //                     input: "$lichChieuTheoPhim",
                    //                     as: "lichChieu",
                    //                     cond: { $eq: ["$$lichChieu.maCumRap_ID", item2.maCumRap] },
                    //                 },
                    //             },
                    //         },
                    //     },
                    // ]);

                    item2.danhSachPhim = await MovieModel.aggregate([
                        // Lọc các documents có maCumRap_ID là "bhd-star-cineplex-3-2"
                        { $match: { "lichChieuTheoPhim.maCumRap_ID": item2.maCumRap } },
                        // Giữ lại chỉ những phần tử trong mảng lichChieuTheoPhim có maCumRap_ID là "bhd-star-cineplex-3-2"
                        {
                            $project: {
                                dangChieu: 1,
                                hinhAnh: 1,
                                hot: 1,
                                sapChieu: 1,
                                tenPhim: 1,
                                lichChieuTheoPhim: {
                                    $filter: {
                                        input: "$lichChieuTheoPhim",
                                        as: "lichChieu",
                                        cond: { $eq: ["$$lichChieu.maCumRap_ID", item2.maCumRap] },
                                    },
                                },
                            },
                        },
                        // Giữ lại chỉ các trường cần thiết trong mảng lichChieuTheoPhim
                        {
                            $project: {
                                "dangChieu": 1,
                                "hinhAnh": 1,
                                "hot": 1,
                                "sapChieu": 1,
                                "tenPhim": 1,
                                "lichChieuTheoPhim._id": 1,
                                "lichChieuTheoPhim.maPhim_ID": 1,
                                "lichChieuTheoPhim.maCumRap_ID": 1,
                                "lichChieuTheoPhim.ngayChieuGioChieu": 1,
                                "lichChieuTheoPhim.giaVe": 1,
                            },
                        },
                    ]);

                    return item2;
                })
            );

            return item;
        })
    );

    return responsesHelper(200, "Xử lý thành công", result);
};

const layThongTinPhim = async (maPhim) => {
    const movie = await MovieModel.findById(maPhim).select("-createdAt -updatedAt -__v -lichChieuTheoPhim -tenHinhAnh");
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
    if (!file) return responsesHelper(400, "Thiếu hình ảnh");
    // console.log(file);

    const movie = await MovieModel.findById(maPhim);
    if (!movie) return responsesHelper(400, "Xử lý không thành công", `Tên phim: ${tenPhim} không tồn tại`);

    // xoá ảnh cũ
    await deleteImg(movie.tenHinhAnh);

    // thêm ảnh mới
    const objHinhAnh = await uploadImg(file);

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
    layThongTinLichChieuHeThongRap,
    layThongTinPhim,
    capNhatPhim,
};
