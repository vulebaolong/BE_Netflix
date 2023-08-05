const express = require("express");
const quanLyNguoiDungController = require("../controllers/quanLyNguoiDungController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/DangKy", quanLyNguoiDungController.dangKy);
router.post("/DangNhap", quanLyNguoiDungController.dangNhap);

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(authController.protect);
router.post("/ThongTinTaiKhoan", quanLyNguoiDungController.thongTinTaiKhoan);

module.exports = router;
