const express = require("express");
const quanLyDatVeController = require("../controllers/quanLyDatVeController");
const protect = require("../middlewares/protect");

const router = express.Router();

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(protect);

router.post("/TaoLichChieu", quanLyDatVeController.taoLichChieu);
router.delete("/XoaLichChieu", quanLyDatVeController.xoaLichChieu);
router.get("/LayDanhSachPhongVe", quanLyDatVeController.layDanhSachPhongVe);
router.post("/DatVe", quanLyDatVeController.datVe);

module.exports = router;
