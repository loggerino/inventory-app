const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

exports.listCategories = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category list");
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
});

exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Create GET`);
});

exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Create POST`);
});

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Update GET`);
});

exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Update POST`);
});

exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Delete GET`);
});

exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Delete POST`);
});