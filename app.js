//app.js
const express = require("express");
const routers = require("./src/routers");


const app = express();

// express.json(): body => JSON
app.use(express.json());

app.use("/api/v1", routers);

module.exports = app;
