const Category = require('../models/category');
const Brand = require('../models/brand');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.index = asyncHandler(async (req, res) => {
    const [
        numCategories,
        numBrands,
        numItems,
    ] = await Promise.all([
        Category.countDocuments({}).exec(),
        Brand.countDocuments({}).exec(),
        Item.countDocuments({}).exec(),
    ]);

    const user = req.user;

    res.render('index', {
        title: 'Inventory App Home',
        categoryCount: numCategories,
        brandCount: numBrands,
        itemCount: numItems,
        isAuthenticated: req.isAuthenticated(),
        user: user,
    });
});
