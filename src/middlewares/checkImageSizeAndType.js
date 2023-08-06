const responsesHelper = require("../helpers/responsesHelper");

// Middleware kiểm tra hình ảnh và dung lượng dưới 1MB
const checkImageSizeAndType = (req, res, next) => {
    // chỉ kiểm tra kích thước và type khi có hình ảnh
    // nếu không có hình ảnh gửi lên sẽ được đi tiếp capNhatPhim hoặc themPhimUploadHinh
    // để kiểm tra tiếp tục
    if (!req.file) return next();

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
