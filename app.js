//app.js
const express = require("express");
const routers = require("./src/routers");
const cors = require("cors");


const app = express();

// Danh sách các đường dẫn được cho phép truy cập
const allowedOrigins = ['http://example1.com', 'http://example2.com'];

const corsOptions = {
  origin: function (origin, callback) {
    // Kiểm tra xem origin có trong danh sách allowedOrigins hay không
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Cho phép truy cập
    } else {
      callback(new Error('Không cho phép truy cập từ nguồn này')); // Từ chối truy cập
    }
  },
};

app.use(cors());

// express.json(): body => JSON
app.use(express.json());

app.use("/api/v1", routers);

module.exports = app;
