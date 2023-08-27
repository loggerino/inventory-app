const express = require('express');
const path = require('path');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// item routes
router.get('/item/create', itemController.itemCreateGet);
router.post('/item/create', upload.single('image'), itemController.itemCreatePost);
router.get('/item/:id/update', userController.isAdmin, itemController.itemUpdateGet);
router.post('/item/:id/update', userController.isAdmin, upload.single('image'), itemController.itemUpdatePost);
router.get('/item/:id/delete', userController.isAdmin, itemController.itemDeleteGet);
router.post('/item/:id/delete', userController.isAdmin, itemController.itemDeletePost);
router.get('/item/:id', itemController.itemDetail);
router.get('/items', itemController.listItem);

// category routes
router.get('/category/create', categoryController.categoryCreateGet);
router.post('/category/create', categoryController.categoryCreatePost);
router.get('/category/:id/update', userController.isAdmin, categoryController.categoryUpdateGet);
router.post('/category/:id/update', userController.isAdmin, categoryController.categoryUpdatePost);
router.get('/category/:id/delete', userController.isAdmin, categoryController.categoryDeleteGet);
router.post('/category/:id/delete', userController.isAdmin, categoryController.categoryDeletePost);
router.get('/category/:id', categoryController.categoryDetail);
router.get('/categories', categoryController.listCategories);

// brand routes
router.get('/brand/create', brandController.brandCreateGet);
router.post('/brand/create', brandController.brandCreatePost);
router.get('/brand/:id/update', userController.isAdmin, brandController.brandUpdateGet);
router.post('/brand/:id/update', userController.isAdmin, brandController.brandUpdatePost);
router.get('/brand/:id/delete', userController.isAdmin, brandController.brandDeleteGet);
router.post('/brand/:id/delete', userController.isAdmin, brandController.brandDeletePost);
router.get('/brand/:id', brandController.brandDetail);
router.get('/brands', brandController.listBrand);

module.exports = router;
