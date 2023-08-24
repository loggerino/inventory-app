const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const itemController = require('../controllers/itemController');

// item routes
router.get('/item/create', itemController.itemCreateGet);
router.post('/item/create', itemController.itemCreatePost);
router.get('/item/:id/update', itemController.itemUpdateGet);
router.post('/item/:id/update', itemController.itemUpdatePost);
router.get('/item/:id/delete', itemController.itemDeleteGet);
router.post('/item/:id/delete', itemController.itemDeletePost);
router.get('/item/:id', itemController.itemDetail);
router.get('/items', itemController.listItem);

// category routes
router.get('/category/create', categoryController.categoryCreateGet);
router.post('/category/create', categoryController.categoryCreatePost);
router.get('/category/:id/update', categoryController.categoryUpdateGet);
router.post('/category/:id/update', categoryController.categoryUpdatePost);
router.get('/category/:id/delete', categoryController.categoryDeleteGet);
router.post('/category/:id/delete', categoryController.categoryDeletePost);
router.get('/category/:id', categoryController.categoryDetail);
router.get('/categories', categoryController.listCategories);

// brand routes
router.get('/brand/create', brandController.brandCreateGet);
router.post('/brand/create', brandController.brandCreatePost);
router.get('/brand/:id/update', brandController.brandUpdateGet);
router.post('/brand/:id/update', brandController.brandUpdatePost);
router.get('/brand/:id/delete', brandController.brandDeleteGet);
router.post('/brand/:id/delete', brandController.brandDeletePost);
router.get('/brand/:id', brandController.brandDetail);
router.get('/brands', brandController.listBrand);

module.exports = router;
