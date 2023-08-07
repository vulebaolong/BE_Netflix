const express = require("express");
const quanLyRapController = require("../controllers/quanLyRapController");

const router = express.Router();

router.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhim);
router.get("/LayThongTinLichChieuHeThongRap", quanLyRapController.layThongTinLichChieuHeThongRap);
router.get("/LayThongTinHeThongRap", quanLyRapController.layThongTinHeThongRap);
router.get("/LayThongTinCumRapTheoHeThong", quanLyRapController.layThongTinCumRapTheoHeThong);


module.exports = router;
