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

module.exports = {
    taoLichChieu,
};
