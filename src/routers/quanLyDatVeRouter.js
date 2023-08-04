const express = require("express");
const quanLyDatVeController = require("../controllers/quanLyDatVeController");

const router = express.Router();

router.post("/DatVe", quanLyDatVeController.taoLichChieu);

module.exports = router;
