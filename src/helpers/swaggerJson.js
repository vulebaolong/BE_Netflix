const quanLyDatVe = {
    content: {
        "/api/v1/QuanLyDatVe/DatVe": {
            post: {
                tags: ["QuanLyDatVe"],
                parameters: [
                    {
                        name: "DanhSachVe",
                        description: "Dữ liệu vé mới",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                maLichChieu: {
                                    type: "string",
                                },
                                danhSachVe: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            maGhe: {
                                                type: "string",
                                            },
                                            giaVe: {
                                                type: "integer",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyDatVe/LayDanhSachPhongVe": {
            get: {
                tags: ["QuanLyDatVe"],
                parameters: [
                    {
                        name: "MaLichChieu",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyDatVe/TaoLichChieu": {
            post: {
                tags: ["QuanLyDatVe"],
                parameters: [
                    {
                        name: "Lịch",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                maRap: {
                                    type: "string",
                                },
                                ngayChieuGioChieu: {
                                    type: "string",
                                },
                                giaVe: {
                                    type: "integer",
                                },
                                maPhim: {
                                    type: "string",
                                },
                            },
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
    },
};

const quanLyNguoiDung = {
    content: {
        "/api/v1/QuanLyNguoiDung/DangNhap": {
            post: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "DangNhap",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                taiKhoan: {
                                    type: "string",
                                },
                                matKhau: {
                                    type: "string",
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyNguoiDung/DangKy": {
            post: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "DangKy",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                hoTen: {
                                    type: "string",
                                },
                                taiKhoan: {
                                    type: "string",
                                },
                                matKhau: {
                                    type: "string",
                                },
                                email: {
                                    type: "string",
                                    format: "email",
                                },
                                soDt: {
                                    type: "string",
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyNguoiDung/ThongTinTaiKhoan": {
            get: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyNguoiDung/ThongTinDatVe": {
            get: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyNguoiDung/CapNhatThongTinNguoiDung": {
            put: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "CapNhatThongTinNguoiDung",
                        in: "body",
                        required: true,
                        properties: {
                            hoTen: {
                                type: "string",
                            },
                            email: {
                                type: "string",
                                format: "email",
                            },
                            taiKhoan: {
                                type: "string",
                            },
                            soDt: {
                                type: "string",
                            },
                            maLoaiNguoiDung: {
                                type: "string",
                            },
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyNguoiDung/CapNhatMatKhau": {
            put: {
                tags: ["QuanLyNguoiDung"],
                parameters: [
                    {
                        name: "CapNhatMatKhau",
                        in: "body",
                        required: true,
                        properties: {
                            matKhauCurent: {
                                type: "string",
                            },
                            matKhauNew: {
                                type: "string",
                            },
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
    },
};

const quanLyPhim = {
    content: {
        "/api/v1/QuanLyPhim/LayDanhSachPhim": {
            get: {
                tags: ["QuanLyPhim"],
                parameters: [
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyPhim/LayThongTinPhim": {
            get: {
                tags: ["QuanLyPhim"],
                parameters: [
                    {
                        name: "MaPhim",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyPhim/ThemPhimUploadHinh": {
            post: {
                tags: ["QuanLyPhim"],
                operationId: "ThemPhimUploadHinh",
                consumes: ["multipart/form-data"],
                produces: [],
                parameters: [
                    {
                        name: "frm",
                        in: "formData",
                        required: false,
                        type: "array",
                        items: {},
                        collectionFormat: "multi",
                        uniqueItems: false,
                    },
                    {
                        name: "TokenCybersoft",
                        in: "header",
                        description: "Nhập token cybersoft",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyPhim/CapNhatPhimUpload": {
            post: {
                tags: ["QuanLyPhim"],
                operationId: "CapNhatPhimUpload",
                consumes: ["multipart/form-data"],
                produces: [],
                parameters: [
                    {
                        name: "frm",
                        in: "formData",
                        required: false,
                        type: "array",
                        items: {},
                        collectionFormat: "multi",
                        uniqueItems: false,
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Nhập token bearer",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyPhim/XoaPhim": {
            delete: {
                tags: ["QuanLyPhim"],
                parameters: [
                    {
                        name: "MaPhim",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
    },
};

const quanLyRap = {
    content: {
        "/api/v1/QuanLyRap/LayThongTinLichChieuPhim": {
            get: {
                tags: ["QuanLyRap"],
                parameters: [
                    {
                        name: "MaPhim",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyRap/LayThongTinLichChieuHeThongRap": {
            get: {
                tags: ["QuanLyRap"],
                parameters: [
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyRap/LayThongTinHeThongRap": {
            get: {
                tags: ["QuanLyRap"],
                parameters: [
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyRap/LayThongTinCumRapTheoHeThong": {
            get: {
                tags: ["QuanLyRap"],
                parameters: [
                    {
                        name: "maHeThongRap",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
        "/api/v1/QuanLyRap/TaoCumRap": {
            post: {
                tags: ["QuanLyRap"],
                parameters: [
                    {
                        name: "CumRap",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                maHeThongRap_ID: {
                                    type: "string",
                                },
                                diaChi: {
                                    type: "string",
                                },
                                maCumRap: {
                                    type: "string",
                                },
                                tenCumRap: {
                                    type: "string",
                                },
                                hinhAnh: {
                                    type: "string",
                                    format: "url",
                                },
                            },
                        },
                    },
                    {
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Success",
                    },
                },
            },
        },
    },
};

module.exports = {
    quanLyDatVe,
    quanLyNguoiDung,
    quanLyPhim,
    quanLyRap,
};
