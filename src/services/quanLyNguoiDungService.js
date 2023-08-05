const responsesHelper = require("../helpers/responsesHelper");
const UserModel = require("../models/userModel");
const { hashedPassword } = require("../helpers/authHelper");
const { createJwt } = require("../helpers/authHelper");
const { checkPassword } = require("../helpers/authHelper");

const dangKy = async (taiKhoan, matKhau, email, soDt, hoTen) => {
    if (!taiKhoan) return responsesHelper(400, "Thiếu tài khoản");
    if (!matKhau) return responsesHelper(400, "Thiếu mật khẩu");
    if (!email) return responsesHelper(400, "Thiếu email");
    if (!soDt) return responsesHelper(400, "Thiếu số điện thoại");
    if (!hoTen) return responsesHelper(400, "Thiếu họ và tên");

    const matKhauMoi = await hashedPassword(matKhau);

    const user = await UserModel.create({
        taiKhoan,
        matKhau: matKhauMoi,
        email,
        soDt,
        hoTen,
    });

    return responsesHelper(200, "Xử lý thành công", {
        id: user._id,
        taiKhoan: user.taiKhoan,
        email: user.email,
        soDt: user.soDt,
        hoTen: user.hoTen,
        matKhau,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
};

const dangNhap = async (taiKhoan, matKhau) => {
    if (!taiKhoan) return responsesHelper(400, "Thiếu tài khoản");
    if (!matKhau) return responsesHelper(400, "Thiếu mật khẩu");

    const user = await UserModel.findOne({ taiKhoan }).select("+matKhau");
    if (!user) return responsesHelper(401, "Tài khoản không tồn tại");

    const isMatKhau = await checkPassword(matKhau, user.matKhau);
    if (!isMatKhau) return responsesHelper(401, "Mật khẩu không đúng");

    // tạo token
    const accessToken = createJwt({ id: `${user._id}`, taiKhoan: user.taiKhoan, email: user.email, soDt: user.soDt, hoTen: user.hoTen }, "90d");
    if (!accessToken) return responsesHelper(500, "Lỗi server: Không tạo được token");

    return responsesHelper(200, "Đăng nhập thành công", {
        id: user._id,
        taiKhoan: user.taiKhoan,
        email: user.email,
        soDt: user.soDt,
        hoTen: user.hoTen,
        accessToken,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
};

const thongTinTaiKhoan = async (user) => {
    const userReturn = await UserModel.findById(user.id);

    return responsesHelper(200, "Xử lý thành công", {
        id: userReturn._id,
        taiKhoan: userReturn.taiKhoan,
        email: userReturn.email,
        soDt: userReturn.soDt,
        hoTen: userReturn.hoTen,
        maLoaiNguoiDung: userReturn.maLoaiNguoiDung,
    });
};

module.exports = {
    dangKy,
    dangNhap,
    thongTinTaiKhoan,
};
