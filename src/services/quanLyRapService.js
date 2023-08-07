const responsesHelper = require("../helpers/responsesHelper");
const CumRapModel = require("../models/cumRapModel");
const HeThongRapModel = require("../models/heThongRapModel");
const LichChieuModel = require("../models/lichChieuModel");
const MovieModel = require("../models/movieModel");
const changeObj = (item) => {
    return JSON.parse(JSON.stringify(item));
};
const layThongTinLichChieuPhim = async (maPhim) => {
    const heThongRap = changeObj(await HeThongRapModel.find().select("logo maHeThongRap tenHeThongRap"));
    const movie = changeObj(await MovieModel.findById(maPhim).select("-lichChieuTheoPhim -__v -updatedAt -createdAt"));

    const heThongRapChieu = await Promise.all(
        heThongRap.map(async (item) => {
            item.cumRapChieu = changeObj(
                await CumRapModel.find({
                    maHeThongRap_ID: item.maHeThongRap,
                    lichChieuTheoCumRap: {
                        $elemMatch: { maPhim_ID: maPhim },
                    },
                }).select("maCumRap tenCumRap diaChi hinhAnh")
            );

            item.cumRapChieu = await Promise.all(
                item.cumRapChieu.map(async (item2) => {
                    item2.lichChieuPhim = await LichChieuModel.find({
                        maPhim_ID: maPhim,
                        maCumRap_ID: item2.maCumRap,
                    }).select("-danhSachVe -createdAt -updatedAt -__v");

                    return item2;
                })
            );

            return item;
        })
    );

    const result = {
        ...movie,
        heThongRapChieu,
    };
    return responsesHelper(200, "Xử lý thành công", result);
};

const layThongTinLichChieuHeThongRap = async () => {
    const heThongRap = changeObj(await HeThongRapModel.find().select("logo maHeThongRap tenHeThongRap"));

    const result = await Promise.all(
        heThongRap.map(async (item) => {
            item.lstCumRap = changeObj(
                await CumRapModel.find({
                    maHeThongRap_ID: item.maHeThongRap,
                    lichChieuTheoCumRap: { $exists: true, $ne: [] }, // Điều kiện chỉ lấy những document có lichChieuTheoCumRap không rỗng
                }).select("maCumRap tenCumRap diaChi hinhAnh")
            );

            item.lstCumRap = await Promise.all(
                item.lstCumRap.map(async (item2) => {
                    item2.danhSachPhim = await MovieModel.aggregate([
                        // Lọc các documents có maCumRap_ID là "bhd-star-cineplex-3-2"
                        { $match: { "lichChieuTheoPhim.maCumRap_ID": item2.maCumRap } },
                        // Giữ lại chỉ những phần tử trong mảng lichChieuTheoPhim có maCumRap_ID là "bhd-star-cineplex-3-2"
                        {
                            $project: {
                                dangChieu: 1,
                                hinhAnh: 1,
                                hot: 1,
                                sapChieu: 1,
                                tenPhim: 1,
                                lichChieuTheoPhim: {
                                    $filter: {
                                        input: "$lichChieuTheoPhim",
                                        as: "lichChieu",
                                        cond: { $eq: ["$$lichChieu.maCumRap_ID", item2.maCumRap] },
                                    },
                                },
                            },
                        },
                        // Giữ lại chỉ các trường cần thiết trong mảng lichChieuTheoPhim
                        {
                            $project: {
                                "dangChieu": 1,
                                "hinhAnh": 1,
                                "hot": 1,
                                "sapChieu": 1,
                                "tenPhim": 1,
                                "lichChieuTheoPhim._id": 1,
                                "lichChieuTheoPhim.maPhim_ID": 1,
                                "lichChieuTheoPhim.maCumRap_ID": 1,
                                "lichChieuTheoPhim.ngayChieuGioChieu": 1,
                                "lichChieuTheoPhim.giaVe": 1,
                            },
                        },
                    ]);

                    return item2;
                })
            );

            return item;
        })
    );

    return responsesHelper(200, "Xử lý thành công", result);
};

const layThongTinHeThongRap = async () => {
    const heThongRap = await HeThongRapModel.find().select("-createdAt -updatedAt -__v");
    return responsesHelper(200, "Xử lý thành công", heThongRap);
};

const layThongTinCumRapTheoHeThong = async (maHeThongRap) => {
    const cumRap = await CumRapModel.find({ maHeThongRap_ID: maHeThongRap }).select("maCumRap tenCumRap");
    return responsesHelper(200, "Xử lý thành công", cumRap);
};

const taoCumRap = async () => {
    const maHeThongRap_ID = "MegaGS";
    const diaChi = "19 Cao Thắng, Q.3";
    const maCumRap = "megags-cao-thang";
    const tenCumRap = "MegaGS - Cao Thắng";
    const hinhAnh = "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png";

    const cumRap = await CumRapModel.create({ maHeThongRap_ID, maCumRap, tenCumRap, diaChi, hinhAnh });
    return responsesHelper(200, "Xử lý thành công", cumRap);
};

module.exports = {
    layThongTinLichChieuPhim,
    layThongTinLichChieuHeThongRap,
    layThongTinHeThongRap,
    layThongTinCumRapTheoHeThong,
    taoCumRap,
};
