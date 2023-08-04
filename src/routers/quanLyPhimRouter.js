const multer = require("multer");
const express = require("express");
const quanLyPhimController = require("../controllers/quanLyPhimController");

const router = express.Router();
const upload = multer();

router.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);
router.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), quanLyPhimController.themPhimUploadHinh);
router.delete("/XoaPhim", quanLyPhimController.xoaPhim);
router.get("/LayThongTinLichChieuHeThongRap", quanLyPhimController.layThongTinLichChieuHeThongRap);

module.exports = router;
