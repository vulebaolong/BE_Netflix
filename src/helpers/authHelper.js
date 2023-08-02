const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashedPassword = async (password) => {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = await bcryptjs.genSalt(10);
    // mã hóa salt + password
    return await bcryptjs.hash(password, salt);
};

const checkPassword = async (userInputPassword, hashedPasswordFromDatabase) => {
    return await bcryptjs.compare(userInputPassword, hashedPasswordFromDatabase);
};

const createJwt = (payload, expiresIn) => {
    const secret = process.env.SECRET;

    if (!secret) return undefined;

    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
};

module.exports = {
    hashedPassword,
    createJwt,
    checkPassword,
};
