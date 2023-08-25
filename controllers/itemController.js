const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.listItem = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name price stock image")
        .sort({ name: 1 })
        .populate("price")
        .populate("stock")

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
    const [allCategories, allBrands] = await Promise.all([
        Category.find(),
        Brand.find(),
    ]);
    res.render('item_form', {
        title: "Create New Item",
        categories: allCategories,
        brands: allBrands,
    });
});

exports.itemCreatePost = [
    body("name", "Item name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    body("price", "Price must be a valid number").isNumeric(),
    body("category", "Price must be a valid number").trim().isLength({ min: 1 }).escape(),
    body("brand", "Price must be a valid number").trim().isLength({ min: 1 }).escape(),
    body("stock", "Stock must be a valid number").isNumeric(),
    body("image", "Must be valid image").trim().optional({ values: "falsy" }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let imageName = '';
        if (req.file) {
            imageName = req.file.filename;
        }
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            stock: req.body.stock,
            image: imageName,
            _id: req.params.id,
        });
        if (!errors.isEmpty()) {
            const [allCategories, allBrands] = await Promise.all([
                Category.find(),
                Brand.find(),
            ]);
            res.render("item_form", {
                title: "Create New Item",
                categories: allCategories,
                brands: allBrands,
                item: item,
            });
            return;
        } else {
            await item.save();
            res.redirect(item.url);
        }
    }),
];

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
    const [item, allCategories, allBrands] = await Promise.all([
        Item.findById(req.params.id),
        Category.find(),
        Brand.find(),
    ]);

    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_form", {
        title: "Update Item Detail",
        item: item,
        categories: allCategories,
        brands: allBrands,
    });
});

exports.itemUpdatePost = [
    body("name", "Item name must be provided").trim().notEmpty().escape(),
    body("description", "Description must be provided").trim().notEmpty().escape(),
    body("price", "Price must be a valid number").isNumeric(),
    body("category", "Category must be selected").trim().isLength({ min: 1 }).escape(),
    body("brand", "Brand must be selected").trim().isLength({ min: 1 }).escape(),
    body("stock", "Stock must be a valid number").isNumeric(),
    body("image", "Must be valid image").trim().optional({ values: "falsy" }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let imageName = '';
        if (req.file) {
            imageName = req.file.filename;
        }
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            stock: req.body.stock,
            image: imageName,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            const [allCategories, allBrands] = await Promise.all([
                Category.find(),
                Brand.find(),
            ]);
            res.render("item_form", {
                title: "Update Item Detail",
                item: item,
                categories: allCategories,
                brands: allBrands,
            });
            return;
        } else {
            await Item.findByIdAndUpdate(req.params.id, item);
            res.redirect(item.url);
        }
    }),
];

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_delete", {
        title: "Delete Item",
        item: item,
    });
});

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect('/inventory/items');
});
