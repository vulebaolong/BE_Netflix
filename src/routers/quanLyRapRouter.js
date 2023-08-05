const express = require("express");
const quanLyRapController = require("../controllers/quanLyRapController");
const quanLyPhimController = require("../controllers/quanLyPhimController");

const router = express.Router();

router.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhim);
router.get("/LayThongTinLichChieuHeThongRap", quanLyPhimController.layThongTinLichChieuHeThongRap);


module.exports = router;
