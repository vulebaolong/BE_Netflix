const express = require("express");
const quanLyRapController = require("../controllers/quanLyRapController");

const router = express.Router();

router.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhim);

module.exports = router;
