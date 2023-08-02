const express = require("express");
const quanLyNguoiDungRouter = require("./quanLyNguoiDungRouter");
const notFoundController = require("../controllers/notFoundController.js");
const errorController = require("../controllers/errorController.js");

const router = express.Router();

// health check
router.get("/welcome", (req, res) => {
    res.status(200).json({ status: "success", message: "Welcome movie API vulebaolong" });
});

router.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);

//xử lý các URL người dùng sử dụng không đúng
router.all("*", notFoundController);
router.use(errorController);

module.exports = router;
