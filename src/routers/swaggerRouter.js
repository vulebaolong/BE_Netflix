const express = require("express");
const swaggerController = require("../controllers/swaggerController");

const router = express.Router();

router.get("/Swagger", swaggerController.swagger);


module.exports = router;
