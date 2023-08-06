const multer = require("multer");
const express = require("express");
const quanLyPhimController = require("../controllers/quanLyPhimController");
const checkImageSizeAndType = require("../middlewares/checkImageSizeAndType");

const router = express.Router();
const upload = multer();

router.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);
router.get("/LayThongTinPhim", quanLyPhimController.layThongTinPhim);
router.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), checkImageSizeAndType, quanLyPhimController.themPhimUploadHinh);
router.post("/CapNhatPhim", upload.single("hinhAnh"), checkImageSizeAndType, quanLyPhimController.capNhatPhim);
router.delete("/XoaPhim", quanLyPhimController.xoaPhim);

module.exports = router;
