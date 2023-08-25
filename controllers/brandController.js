const Brand = require('../models/brand');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

exports.listBrand = asyncHandler(async (req, res, next) => {
    const allBrands = await Brand.find({}, "name description")
        .sort({ name: 1 })
        .populate("description");

    res.render("brand_list", { title: "Brand List", listBrand: allBrands });
});

exports.brandDetail = asyncHandler(async (req, res, next) => {
    const [brand, itemsInBrand] = await Promise.all([
        Brand.findById(req.params.id),
        Item.find({ brand: req.params.id }, "name description"),
    ]);

    if (brand === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    res.render("brand_detail", {
        title: "Brand Detail",
        brand: brand,
        brand_items: itemsInBrand,
    });
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