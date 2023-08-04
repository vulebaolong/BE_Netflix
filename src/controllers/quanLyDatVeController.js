const quanLyDatVeService = require("../services/quanLyDatVeService");

const taoLichChieu = async (req, res, next) => {
    try {
        const { maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe } = req.body;

        const result = await quanLyDatVeService.taoLichChieu(maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const layDanhSachPhongVe = async (req, res, next) => {
    try {
        const maLichChieu = req.query.MaLichChieu;

        const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const datVe = async (req, res, next) => {
    try {
        const { maLichChieu, danhSachVe } = req.body;

        const user = req.user;

        const result = await quanLyDatVeService.datVe(maLichChieu, danhSachVe, user);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    taoLichChieu,
    layDanhSachPhongVe,
    datVe,
};
