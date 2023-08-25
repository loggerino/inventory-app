const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

exports.listCategories = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name description")
        .sort({ name: 1 })
        .populate("description");

    res.render("category_list", { title: "Category List", listCategories: allCategories });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id),
        Item.find({ category: req.params.id }, "name description"),
    ]);

    if (category === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    res.render("category_detail", { 
        title: "Category Detail",
        category: category,
        category_items: itemsInCategory,
    });
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