const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    res.render("category_form", { title: "Create New Category" });
});

exports.categoryCreatePost = [
    body("name", "Category name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        });
        if (!errors.isEmpty()) {
            res.render("category_form", {
                title: "Create New Category",
                category: category,
            });
            return;
        } else {
            await category.save();
            res.redirect(category.url);
        }
    }),
]

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate('name').populate('description');

    if (category === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    res.render("category_form", {
        title: "Update Category Detail",
        category: category,
    });
});

exports.categoryUpdatePost = [
    body("name", "Category name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id,
        });
        if (!errors.isEmpty()) {
            res.render("category_form", {
                title: "Create New Category",
                category: category,
            });
            return;
        } else {
            await Category.findByIdAndUpdate(req.params.id, category);
            res.redirect(category.url);
        }
    }),
];

exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id),
        Item.find({ category: req.params.id }, "name description"),
    ]);

    if (category === null) {
        res.redirect('/inventory/categories');
    }

    res.render("category_delete", {
        title: "Delete Category",
        category: category,
        category_items: itemsInCategory,
    });
});

exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id),
        Item.find({ category: req.params.id }, "name description"),
    ]);

    if (itemsInCategory.length > 0) {
        res.render("brand_delete", {
            title: "Delete Brand",
            category: category,
            category_items: itemsInCategory,
        });
        return;
    } else {
        await Category.findByIdAndRemove(req.body.categoryid);
        res.redirect('/inventory/categories')
    }
});