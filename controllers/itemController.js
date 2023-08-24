const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

exports.listItem = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item list");
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Detail: ${req.params.id}`);
});

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Create GET`);
});

exports.itemCreatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Create POST`);
});

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Update GET`);
});

exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Update POST`);
});

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Delete GET`);
});

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Delete POST`);
});