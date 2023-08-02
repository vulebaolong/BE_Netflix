const express = require("express");
const createError = require("http-errors");
const notFoundController = (req, res, next) => {
    next(createError(404, `Can't find ${req.originalUrl} on this sever!`));
};

module.exports = notFoundController
