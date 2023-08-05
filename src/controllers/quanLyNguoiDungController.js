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

const dangNhap = async (req, res, next) => {
    try {
        const { taiKhoan, matKhau } = req.body;

        const result = await quanLyNguoiDungService.dangNhap(taiKhoan, matKhau);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const thongTinTaiKhoan = async (req, res, next) => {
    try {
        const result = await quanLyNguoiDungService.thongTinTaiKhoan(req.user);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const capNhatThongTinNguoiDung = async (req, res, next) => {
    try {
        const user = req.user;
        const { email, hoTen, maLoaiNguoiDung, soDt, taiKhoan } = req.body;

        const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(email, hoTen, maLoaiNguoiDung, soDt, taiKhoan, user);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const capNhatMatKhau = async (req, res, next) => {
    try {
        const user = req.user;
        const { matKhauCurent, matKhauNew } = req.body;

        const result = await quanLyNguoiDungService.capNhatMatKhau(matKhauCurent, matKhauNew, user);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    dangKy,
    dangNhap,
    thongTinTaiKhoan,
    capNhatThongTinNguoiDung,
    capNhatMatKhau,
};
