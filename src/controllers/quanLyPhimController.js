const quanLyPhimService = require("../services/quanLyPhimService");

const themPhimUploadHinh = async (req, res, next) => {
    try {
        const { tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia } = req.body;

        const result = await quanLyPhimService.themPhimUploadHinh(req.file, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const xoaPhim = async (req, res, next) => {
    try {
        const maPhim = req.query.MaPhim;

        const result = await quanLyPhimService.xoaPhim(maPhim);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const layDanhSachPhim = async (req, res, next) => {
    try {
        const result = await quanLyPhimService.layDanhSachPhim();

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};


const layThongTinPhim = async (req, res, next) => {
    try {
        const maPhim = req.query.MaPhim;

        const result = await quanLyPhimService.layThongTinPhim(maPhim);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const capNhatPhim = async (req, res, next) => {
    try {
        const { maPhim, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia } = req.body;

        const result = await quanLyPhimService.capNhatPhim(req.file, maPhim, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    themPhimUploadHinh,
    xoaPhim,
    layDanhSachPhim,
    layThongTinPhim,
    capNhatPhim,
};
