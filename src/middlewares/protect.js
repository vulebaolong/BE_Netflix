const { verifyJwt } = require("../helpers/authHelper");
const responsesHelper = require("../helpers/responsesHelper");

const protect = async (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) return res.status(200).json(responsesHelper(400, "Xử Lý Không Thành Công", "Không Đủ Quyền Truy Cập"));
    if (accessToken.split(" ")[1] === "null") return res.status(200).json(responsesHelper(400, "Xử Lý Không Thành Công", "Không Đủ Quyền Truy Cập"));

    const decodedToken = verifyJwt(accessToken.split(" ")[1]);

    req.user = decodedToken;
    next();
};

module.exports = protect;
