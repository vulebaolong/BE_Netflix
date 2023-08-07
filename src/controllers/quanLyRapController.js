const quanLyRapController = require("../services/quanLyRapService");

const layThongTinLichChieuPhim = async (req, res, next) => {
    try {
        const maPhim = req.query.MaPhim;

        const result = await quanLyRapController.layThongTinLichChieuPhim(maPhim);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const layThongTinLichChieuHeThongRap = async (req, res, next) => {
    try {
        const result = await quanLyRapController.layThongTinLichChieuHeThongRap();

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const layThongTinHeThongRap = async (req, res, next) => {
    try {
        const result = await quanLyRapController.layThongTinHeThongRap();

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

const layThongTinCumRapTheoHeThong = async (req, res, next) => {
    try {
        const maHeThongRap = req.query.maHeThongRap
        
        const result = await quanLyRapController.layThongTinCumRapTheoHeThong(maHeThongRap);

        res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    layThongTinLichChieuPhim,
    layThongTinLichChieuHeThongRap,
    layThongTinHeThongRap,
    layThongTinCumRapTheoHeThong,
};
