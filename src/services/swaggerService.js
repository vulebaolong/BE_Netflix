const responsesHelper = require("../helpers/responsesHelper");
const swaggerJson = require("../helpers/swaggerJson");
const swagger = async () => {
    const result = {
        swagger: "2.0",
        info: {
            title: "API Moive - Vũ Lê Bảo Long",
            version: "1.0.0",
        },
        paths: {
            ...swaggerJson.quanLyDatVe.content,
            ...swaggerJson.quanLyNguoiDung.content,
            ...swaggerJson.quanLyPhim.content,
            ...swaggerJson.quanLyRap.content,
        },
    };
    return responsesHelper(200, "Xử lý thành công", result);
};

module.exports = {
    swagger,
};
