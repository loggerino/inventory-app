const Brand = require('../models/brand');
const asyncHandler = require("express-async-handler");

exports.listBrand = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand list");
});

exports.brandDetail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Detail: ${req.params.id}`);
});

exports.brandCreateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Create GET`);
});

exports.brandCreatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Create POST`);
});

exports.brandUpdateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Update GET`);
});

exports.brandUpdatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Update POST`);
});

exports.brandDeleteGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Delete GET`);
});

exports.brandDeletePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Delete POST`);
});