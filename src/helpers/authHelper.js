const bcryptjs = require("bcryptjs");

const hashedPassword = async (password) => {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = await bcryptjs.genSalt(10);
    // mã hóa salt + password
    return await bcryptjs.hash(password, salt);
};

module.exports = {
    hashedPassword,
};
