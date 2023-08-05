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

module.exports = {
    layThongTinLichChieuPhim,
};
