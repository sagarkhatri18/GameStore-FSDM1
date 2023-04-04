const router = require('express').Router();
const adminController = require('../controllers/admin.controllers');

router.post('/login', adminController.login);

router.get('/categories', adminController.categories);

router.get('/products', adminController.products);

router.get('/product/:id', adminController.fetchSingleProduct);

router.get('/category-products/:category_id', adminController.fetchCategoryProducts);

router.post('/add-category', adminController.addCategory);

router.delete('/category/:category_id', adminController.deleteCategory);

router.get('/homepage', adminController.homePage);

module.exports = router;