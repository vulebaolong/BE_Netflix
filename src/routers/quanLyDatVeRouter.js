const express = require("express");
const quanLyDatVeController = require("../controllers/quanLyDatVeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/TaoLichChieu", quanLyDatVeController.taoLichChieu);
router.get("/LayDanhSachPhongVe", quanLyDatVeController.layDanhSachPhongVe);

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(authController.protect);
router.post("/DatVe", quanLyDatVeController.datVe);

module.exports = router;
