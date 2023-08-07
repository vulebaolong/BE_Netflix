const express = require("express");
const quanLyRapController = require("../controllers/quanLyRapController");
const protect = require("../middlewares/protect");

const router = express.Router();

router.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhim);
router.get("/LayThongTinLichChieuHeThongRap", quanLyRapController.layThongTinLichChieuHeThongRap);
router.get("/LayThongTinHeThongRap", quanLyRapController.layThongTinHeThongRap);
router.get("/LayThongTinCumRapTheoHeThong", quanLyRapController.layThongTinCumRapTheoHeThong);

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(protect);
router.post("/TaoCumRap", quanLyRapController.taoCumRap);


module.exports = router;
