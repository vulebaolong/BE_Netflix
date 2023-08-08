const responsesHelper = require("../helpers/responsesHelper");

const check = async (event) => {
    let status;
    if (event === "app.suspended") {
        status = "suspended";
        // Cập nhật trạng thái, gửi thông báo, v.v.
    } else if (event === "app.resumed") {
        status = "resumed";
        // Cập nhật trạng thái, gửi thông báo, v.v.
    }

    return responsesHelper(200, "Xử Lý Thành Công", status);
};

module.exports = {
    check,
};
