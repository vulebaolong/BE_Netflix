const responsesHelper = require("../helpers/responsesHelper");

// Middleware kiểm tra hình ảnh và dung lượng dưới 1MB
const checkImageSizeAndType = (req, res, next) => {
    // Kiểm tra xem có file được tải lên không
    if (!req.file) {
        const result = responsesHelper(400, "Xử lý không thành công", "Vui lòng chọn một tệp hình ảnh.");
        return res.status(result.code).json(result);
    }

    // Kiểm tra kiểu của tệp (hình ảnh)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        const result = responsesHelper(400, "Xử lý không thành công", "Tệp tải lên không phải là hình ảnh hợp lệ.");
        return res.status(result.code).json(result);
    }

    // Kiểm tra dung lượng của tệp (dưới 1MB)
    const maxFileSize = 1024 * 1024; // 1MB
    if (req.file.size > maxFileSize) {
        const result = responsesHelper(400, "Xử lý không thành công", "Dung lượng của hình ảnh vượt quá 1MB.");
        return res.status(result.code).json(result);
    }

    // Nếu hợp lệ, tiếp tục tới middleware tiếp theo
    next();
};

module.exports = checkImageSizeAndType;
