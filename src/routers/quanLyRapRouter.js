const express = require("express");
const quanLyRapController = require("../controllers/quanLyRapController");
const quanLyPhimController = require("../controllers/quanLyPhimController");

const router = express.Router();

router.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhim);
router.get("/LayThongTinLichChieuHeThongRap", quanLyRapController.layThongTinLichChieuHeThongRap);
router.get("/LayThongTinHeThongRap", quanLyRapController.layThongTinHeThongRap);


module.exports = router;
