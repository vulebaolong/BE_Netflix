const responsesHelper = require("../helpers/responsesHelper");

const check = async (event) => {
    console.log(event);
    let statusApp;
    if (event === "app.suspended") {
        statusApp = "suspended";
        // Cập nhật trạng thái, gửi thông báo, v.v.
    } else if (event === "app.resumed") {
        statusApp = "resumed";
        // Cập nhật trạng thái, gửi thông báo, v.v.
    }

    return responsesHelper(200, "Xử Lý Thành Công", statusApp);
};

module.exports = {
    check,
};
