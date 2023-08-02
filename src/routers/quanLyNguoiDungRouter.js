const express = require("express");
const quanLyNguoiDungController = require("../controllers/quanLyNguoiDungController");

const router = express.Router();

router.post("/DangKy", quanLyNguoiDungController.dangKy);

module.exports = router;
