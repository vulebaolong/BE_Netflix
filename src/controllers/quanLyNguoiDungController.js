const quanLyNguoiDungService = require("../services/quanLyNguoiDungService");

const dangKy = async (req, res, next) => {
    try {
        const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;

        const newUser = await quanLyNguoiDungService.dangKy(taiKhoan, matKhau, email, soDt, hoTen);

        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    dangKy,
};
