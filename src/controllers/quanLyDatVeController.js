const quanLyDatVeService = require("../services/quanLyDatVeService");

const taoLichChieu = async (req, res, next) => {
    try {
        const { maPhim, maRap, ngayChieuGioChieu, giaVe } = req.body;
        
        const maPhim_ID = maPhim;

        const maCumRap_ID = maRap;

        const result = await quanLyDatVeService.taoLichChieu(maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const xoaLichChieu = async (req, res, next) => {
    try {
        const maLichChieu = req.query.maLichChieu;
        
        const result = await quanLyDatVeService.xoaLichChieu(maLichChieu);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const layDanhSachPhongVe = async (req, res, next) => {
    try {
        const maLichChieu = req.query.MaLichChieu;

        const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const datVe = async (req, res, next) => {
    try {
        const { maLichChieu, danhSachVe } = req.body;

        const user = req.user;

        const result = await quanLyDatVeService.datVe(maLichChieu, danhSachVe, user);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    taoLichChieu,
    layDanhSachPhongVe,
    datVe,
    xoaLichChieu
};
