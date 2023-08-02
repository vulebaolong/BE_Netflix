const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        taiKhoan: { type: String, unique: true, trim: true },
        matKhau: { type: String, select: false },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (val) {
                    return validator.isEmail(val);
                },
                message: "Email không hợp lệ",
            },
        },
        soDt: { type: String, trim: true },
        hoTen: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

userSchema.path("matKhau").select(false);

// Tạo model User dựa trên schema đã định nghĩa
const UserModel = mongoose.model("User", userSchema);

// Xuất model User để sử dụng trong các module khác
module.exports = UserModel;
