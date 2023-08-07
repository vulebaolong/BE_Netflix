const multer = require("multer");
const express = require("express");
const quanLyPhimController = require("../controllers/quanLyPhimController");
const checkImageSizeAndType = require("../middlewares/checkImageSizeAndType");
const protect = require("../middlewares/protect");

const router = express.Router();
const upload = multer();

router.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);
router.get("/LayThongTinPhim", quanLyPhimController.layThongTinPhim);

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(protect);
router.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), checkImageSizeAndType, quanLyPhimController.themPhimUploadHinh);
router.post("/CapNhatPhim", upload.single("hinhAnh"), checkImageSizeAndType, quanLyPhimController.capNhatPhim);
router.delete("/XoaPhim", quanLyPhimController.xoaPhim);

module.exports = router;
