const router = require('express').Router();
const adminController = require('../controllers/admin.controllers');

router.post('/login', adminController.login);

router.get('/categories', adminController.categories);

router.get('/products', adminController.products);

router.get('/product/:id', adminController.fetchSingleProduct);

router.get('/category-products/:category_id', adminController.fetchCategoryProducts);

router.get('/add-category', adminController.addCategory);

router.get('/homepage', adminController.homePage);

module.exports = router;