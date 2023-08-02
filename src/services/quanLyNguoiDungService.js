const responsesHelper = require("../helpers/responsesHelper");
const UserModel = require("../models/userModel");
const { hashedPassword } = require("../helpers/authHelper");

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
    });
};

module.exports = {
    dangKy,
};
