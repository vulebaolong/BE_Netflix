const quanLyPhimService = require("../services/quanLyPhimService");

const themPhimUploadHinh = async (req, res, next) => {
    try {
        const { tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia } = req.body;
        console.log(req.body);
        console.log(req.file);
        const result = await quanLyPhimService.themPhimUploadHinh(req.file, tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    themPhimUploadHinh,
};
