const quanLyPhimService = require("../services/quanLyPhimService");

const themPhimUploadHinh = async (req, res, next) => {
    try {
        const { tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia } = req.body;

        const result = await quanLyPhimService.themPhimUploadHinh(req.file, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const xoaPhim = async (req, res, next) => {
    try {
        const maPhim = req.query.MaPhim;

        const result = await quanLyPhimService.xoaPhim(maPhim);

        res.status(200).json("OKE");
    } catch (error) {
        next(error);
    }
};

const layDanhSachPhim = async (req, res, next) => {
    try {
        const result = await quanLyPhimService.layDanhSachPhim();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    themPhimUploadHinh,
    xoaPhim,
    layDanhSachPhim
};
