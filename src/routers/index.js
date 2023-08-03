const express = require("express");
const quanLyNguoiDungRouter = require("./quanLyNguoiDungRouter");
const quanLyPhimRouter = require("./quanLyPhimRouter");
const notFoundHelper = require("../helpers/notFoundHelper");
const errorHelper = require("../helpers/errorHelper");

const router = express.Router();

// health check
router.get("/welcome", (req, res) => {
    res.status(200).json({ status: "success", message: "Welcome movie API vulebaolong" });
});

router.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);
router.use("/QuanLyPhim", quanLyPhimRouter);

//xử lý các URL người dùng sử dụng không đúng
router.all("*", notFoundHelper);
router.use(errorHelper);

module.exports = router;
