const quanLyRapController = require("../services/quanLyRapService");

const layThongTinLichChieuPhim = async (req, res, next) => {
    try {
        const maPhim = req.query.MaPhim;

        const result = await quanLyRapController.layThongTinLichChieuPhim(maPhim);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    layThongTinLichChieuPhim,
};
