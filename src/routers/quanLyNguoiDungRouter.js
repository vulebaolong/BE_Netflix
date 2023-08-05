const express = require("express");
const quanLyNguoiDungController = require("../controllers/quanLyNguoiDungController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/DangKy", quanLyNguoiDungController.dangKy);
router.post("/DangNhap", quanLyNguoiDungController.dangNhap);

//! những dòng mã chạy sau sẽ đều có protect, vì chạy theo thứ tự
router.use(authController.protect);
router.get("/ThongTinTaiKhoan", quanLyNguoiDungController.thongTinTaiKhoan);
router.put("/CapNhatThongTinNguoiDung", quanLyNguoiDungController.capNhatThongTinNguoiDung);
router.put("/CapNhatMatKhau", quanLyNguoiDungController.capNhatMatKhau);

module.exports = router;
