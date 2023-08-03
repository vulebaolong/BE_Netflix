const multer = require("multer");
const express = require("express");
const quanLyPhimController = require("../controllers/quanLyPhimController");

const router = express.Router();
const upload = multer();

// Tạo middleware riêng trong file quanLyPhimRouter.js
// router.use(express.urlencoded({ extended: true }));
router.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), quanLyPhimController.themPhimUploadHinh);

module.exports = router;
