const express = require("express");
const checkAppStatusController = require("../controllers/checkAppStatusController");

const router = express.Router();

router.get("/webhook/render", checkAppStatusController.check);


module.exports = router;
