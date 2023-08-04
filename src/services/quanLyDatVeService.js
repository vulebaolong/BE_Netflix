const responsesHelper = require("../helpers/responsesHelper");
const CumRapModel = require("../models/cumRapModel");
const LichChieuModel = require("../models/lichChieuModel");
const MovieModel = require("../models/movieModel");

const taoLichChieu = async (maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe) => {
    // const newData = { maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe };

    const movie = await MovieModel.findById(maPhim_ID);
    const cumrap = await CumRapModel.findOne({ maCumRap: maCumRap_ID });

    if (!movie) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy phim");
    if (!cumrap) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy cum rạp");

    const lichChieu = await LichChieuModel.create({ maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe });

    // Cập nhật dữ liệu cho các bản ghi phim
    await MovieModel.updateMany({ _id: maPhim_ID }, { $push: { lichChieuTheoPhim: lichChieu } });

    // Cập nhật dữ liệu cho các bản ghi cụm rạp
    await CumRapModel.updateMany({ maCumRap: maCumRap_ID }, { $push: { lichChieuTheoCumRap: lichChieu } });

    return responsesHelper(200, "Xử Lý Thành Công", "Tạo Lịch Chiếu Thành công");
};

const layDanhSachPhongVe = async (maLichChieu) => {
    const lichChieu = await LichChieuModel.findById(maLichChieu);
    const cumRap = await CumRapModel.findOne({ maCumRap: lichChieu.maCumRap_ID });
    const movie = await MovieModel.findById(lichChieu.maPhim_ID).select("tenPhim hinhAnh");

    const renderGiaVe = (loaiGhe) => {
        let giaVe = lichChieu.giaVe;
        if (loaiGhe === "Vip") {
            giaVe += 15000;
        }
        return giaVe;
    };
    const rederLoaiGhe = (tenGhe) => {
        let loaiGhe = "Thuong";
        if (
            (tenGhe > 34 && tenGhe < 47) ||
            (tenGhe > 50 && tenGhe < 63) ||
            (tenGhe > 66 && tenGhe < 79) ||
            (tenGhe > 82 && tenGhe < 95) ||
            (tenGhe > 98 && tenGhe < 111) ||
            (tenGhe > 114 && tenGhe < 127)
        ) {
            loaiGhe = "Vip";
        }
        return loaiGhe;
    };
    const danhSachGhe = Array(160)
        .fill()
        .map((_, i) => {
            const tenGhe = `${i + 1}`;

            const loaiGhe = rederLoaiGhe(tenGhe);

            const giaVe = renderGiaVe(loaiGhe);

            return {
                daDat: false,
                giaVe,
                loaiGhe,
                maGhe: `${lichChieu._id}-${tenGhe}`,
                tenGhe,
                taiKhoanNguoiDatL: null,
            };
        });

    const result = {
        danhSachGhe,
        thongTinPhim: {
            diaChi: cumRap.diaChi,
            gioChieu: lichChieu.ngayChieuGioChieu.split(" ")[1],
            hinhAnh: movie.hinhAnh,
            maLichChieu: lichChieu._id,
            tenPhim: movie.tenPhim,
            ngayChieu: lichChieu.ngayChieuGioChieu.split(" ")[0],
            tenCumRap: cumRap.tenCumRap,
        },
    };

    return responsesHelper(200, "Xử Lý Thành Công", result);
};

const datVe = async (maLichChieu, danhSachVe, user) => {
    
    return responsesHelper(200, "Xử Lý Thành Công", { maLichChieu, danhSachVe, user });
};

module.exports = {
    taoLichChieu,
    layDanhSachPhongVe,
    datVe
};
