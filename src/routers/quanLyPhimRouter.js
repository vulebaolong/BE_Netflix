const multer = require("multer");
const express = require("express");
const quanLyPhimController = require("../controllers/quanLyPhimController");

const router = express.Router();
const upload = multer();

router.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);
router.get("/LayThongTinPhim", quanLyPhimController.layThongTinPhim);
router.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), quanLyPhimController.themPhimUploadHinh);
router.delete("/XoaPhim", quanLyPhimController.xoaPhim);

module.exports = router;
