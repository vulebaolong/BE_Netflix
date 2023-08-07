const responsesHelper = require("../helpers/responsesHelper");
const CumRapModel = require("../models/cumRapModel");
const DatVeModel = require("../models/datVeModel");
const LichChieuModel = require("../models/lichChieuModel");
const MovieModel = require("../models/movieModel");
const UserModel = require("../models/userModel");
const changeObj = (item) => {
    return JSON.parse(JSON.stringify(item));
};
const taoLichChieu = async (maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe) => {
    if (!maPhim_ID) return responsesHelper(400, "Thiếu maPhim_ID");
    if (!maCumRap_ID) return responsesHelper(400, "Thiếu maCumRap_ID");
    if (!ngayChieuGioChieu) return responsesHelper(400, "Thiếu ngayChieuGioChieu");
    if (!giaVe) return responsesHelper(400, "Thiếu giaVe");

    const movie = await MovieModel.findById(maPhim_ID);
    const cumrap = await CumRapModel.findOne({ maCumRap: maCumRap_ID });

    if (!movie) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy phim");
    if (!cumrap) return responsesHelper(400, "Xử Lý Không Thành Công", "Không tìm thấy cum rạp");

    const lichChieu = changeObj(await LichChieuModel.create({ maPhim_ID, maCumRap_ID, ngayChieuGioChieu, giaVe }));
    delete lichChieu.danhSachVe;
    // Cập nhật dữ liệu cho các bản ghi phim
    await MovieModel.updateMany({ _id: maPhim_ID }, { $push: { lichChieuTheoPhim: lichChieu } });

    // Cập nhật dữ liệu cho các bản ghi cụm rạp
    await CumRapModel.updateMany({ maCumRap: maCumRap_ID }, { $push: { lichChieuTheoCumRap: lichChieu } });

    return responsesHelper(200, "Xử Lý Thành Công", "Tạo Lịch Chiếu Thành công");
};

const xoaLichChieu = async (maLichChieu) => {
    if (!maLichChieu) return responsesHelper(400, "Thiếu maLichChieu");

    const lichChieu = changeObj(await LichChieuModel.findById(maLichChieu));
    if (!lichChieu) return responsesHelper(400, "Xử Lý Không Thành Công", "Lịch chiếu không tồn tại");

    await LichChieuModel.deleteOne({ _id: maLichChieu });

    await MovieModel.updateMany({ _id: lichChieu.maPhim_ID }, { $pull: { lichChieuTheoPhim: { _id: maLichChieu } } });

    await CumRapModel.updateMany({ maCumRap: lichChieu.maCumRap_ID }, { $pull: { lichChieuTheoCumRap: { _id: maLichChieu } } });

    return responsesHelper(200, "Xử Lý Thành Công", maLichChieu);
};

const layDanhSachPhongVe = async (maLichChieu) => {
    if (!maLichChieu) return responsesHelper(400, "Thiếu maLichChieu");

    const lichChieu = await LichChieuModel.findById(maLichChieu);

    const cumRap = await CumRapModel.findOne({ maCumRap: lichChieu.maCumRap_ID });

    const movie = await MovieModel.findById(lichChieu.maPhim_ID).select("tenPhim hinhAnh");

    const { danhSachVe } = lichChieu;

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

            const gheDaDat = danhSachVe.find((ve) => {
                const stt = ve.maGhe.split("-")[1];
                if (stt === tenGhe) return true;
            });

            const taiKhoanNguoiDat = gheDaDat !== undefined ? gheDaDat.taiKhoanNguoiDat : null;
            const daDat = gheDaDat !== undefined ? true : false;

            return {
                daDat,
                giaVe,
                loaiGhe,
                maGhe: `${lichChieu._id}-${tenGhe}`,
                tenGhe,
                taiKhoanNguoiDat,
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
    if (!maLichChieu) return responsesHelper(400, "Thiếu maLichChieu");
    if (!danhSachVe) return responsesHelper(400, "Thiếu danhSachVe");

    const lichChieuCheck = await LichChieuModel.findById(maLichChieu);
    const danhSachVeCheck = lichChieuCheck.danhSachVe;

    // kiểm tra danh sách vé gửi lên
    const danhSachVeNew = danhSachVe.map((ve, i) => {
        const maLichChieu_ID = ve.maGhe.split("-")[0];

        const stt = ve.maGhe.split("-")[1];

        if (maLichChieu_ID !== maLichChieu) return "Vé có lịch chiếu không hợp lệ";

        if (!(+stt >= 1 && +stt <= 160)) return "Số thứ tự của vé không hợp lệ";

        const isDanhSachVeCheck = danhSachVeCheck.findIndex((item) => item.maGhe === ve.maGhe);

        if (isDanhSachVeCheck !== -1) return `Ghế ${ve} đã được đặt`;

        return {
            ...ve,
            taiKhoanNguoiDat: user.taiKhoan,
        };
    });

    const isDanhSachVeNew = danhSachVeNew.find((ve) => {
        if (typeof ve === "string") return true;
    });
    // nếu vé có vấn đề trả lại lỗi
    if (isDanhSachVeNew) return responsesHelper(400, "Xử Lý Không Thành Công", isDanhSachVeNew);

    const lichChieu = await LichChieuModel.findByIdAndUpdate(maLichChieu, { $push: { danhSachVe: { $each: danhSachVeNew } } });
    // const lichChieu = await LichChieuModel.findById(maLichChieu);

    // Tìm DatVeModel có user_ID = user
    const datVe = await DatVeModel.findOne({ user_ID: user.id });

    if (!datVe) {
        console.log("Không tìm thấy DatVeModel với user_ID = user.");
        // create cái mới
        const datVeNew = await DatVeModel.create({
            user_ID: user.id,
            thongTinDatVe: [
                {
                    danhSachGhe: [maLichChieu],
                    maPhim_ID: lichChieu.maPhim_ID,
                },
            ],
        });
        return responsesHelper(200, "Xử Lý Thành Công", datVeNew);
    }

    // Tìm thongTinDatVe có maPhim_ID = maPhim
    const index = datVe.thongTinDatVe.findIndex((item) => item.maPhim_ID === lichChieu.maPhim_ID);

    if (index === -1) {
        console.log("Không tìm thấy thongTinDatVe với maPhim_ID = lichChieu.maPhim_ID.");

        // nếu không tìm thấy thì tạo mới obj trong thongTinDatVe
        datVe.thongTinDatVe.push({ danhSachGhe: [maLichChieu], maPhim_ID: lichChieu.maPhim_ID });

        datVe.markModified("thongTinDatVe");

        // Lưu lại dữ liệu đã cập nhật
        await datVe.save();

        return responsesHelper(200, "Xử Lý Thành Công", datVe);
    }

    // Kiểm tra nếu maLichChieu chưa có trong danhSachGhe
    if (!datVe.thongTinDatVe[index].danhSachGhe.includes(maLichChieu)) {
        // Thêm maLichChieu vào danhSachGhe
        datVe.thongTinDatVe[index].danhSachGhe.push(maLichChieu);

        datVe.markModified("thongTinDatVe");

        // Lưu lại dữ liệu đã cập nhật
        await datVe.save();

        return responsesHelper(200, "Xử Lý Thành Công", datVe);
    }

    return responsesHelper(200, "Xử Lý Thành Công", datVe);
};

module.exports = {
    taoLichChieu,
    layDanhSachPhongVe,
    datVe,
    xoaLichChieu,
};
