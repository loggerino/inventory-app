const Brand = require('../models/brand');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    res.render("brand_form", { title: "Create New Brand" });
});

exports.brandCreatePost = [
    body("name", "Brand name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    body("year", "Year must be a valid number").optional({ checkFalsy: true }).isInt().toInt(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
        });
        if (!errors.isEmpty()) {
            res.render("brand_form", {
                title: "Create New Brand",
                description: description,
                year: year,
            });
            return;
        } else {
            await brand.save();
            res.redirect(brand.url);
        }
    }),
];

exports.brandUpdateGet = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id).populate('name').populate('description').populate('year');

    if (brand === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    res.render("brand_form", {
        title: "Update Brand Detail",
        brand: brand,
    });
});

exports.brandUpdatePost = [
    body("name", "Brand name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    body("year", "Year must be a valid number").optional({ checkFalsy: true }).isInt().toInt(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            _id: req.params.id,
        });
        if (!errors.isEmpty()) {
            res.render("brand_form", {
                title: "Create New Brand",
                description: description,
                year: year,
            });
            return;
        } else {
            await Brand.findByIdAndUpdate(req.params.id, brand);
            res.redirect(brand.url);
        }
    }),
];

exports.brandDeleteGet = asyncHandler(async (req, res, next) => {
    const [brand, itemsInBrand] = await Promise.all([
        Brand.findById(req.params.id),
        Item.find({ brand: req.params.id }, "name description"),
    ]);

    if (brand === null) {
        res.redirect('/inventory/brands');
    }

    res.render("brand_delete", {
        title: "Delete Brand",
        brand: brand,
        brand_items: itemsInBrand,
    });
});

exports.brandDeletePost = asyncHandler(async (req, res, next) => {
    const [brand, itemsInBrand] = await Promise.all([
        Brand.findById(req.params.id),
        Item.find({ brand: req.params.id }, "name description"),
    ]);

    if (itemsInBrand.length > 0) {
        res.render("brand_delete", {
            title: "Delete Brand",
            brand: brand,
            brand_items: itemsInBrand,
        });
        return;
    } else {
        await Brand.findByIdAndRemove(req.body.brandid);
        res.redirect('/inventory/brands')
    }
});

