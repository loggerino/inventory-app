const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const asyncHandler = require("express-async-handler");

exports.listItem = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name price stock")
        .sort({ name: 1 })
        .populate("price")
        .populate("stock");

    res.render("item_list", { title: "Item List", listItem: allItems });
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
        .populate('category')
        .populate('brand')

    if (item === null) {
        const err = new Error('Item not found');
        err.status = 404;
        return next(err);
    }

    res.render('item_detail', { title: 'Item Detail', item });
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