const router = require('express').Router();
const adminController = require('../controllers/admin.controllers');

// route for contact request
router.post('/login', adminController.login);

router.get('/categories', adminController.categories);

router.get('/products', adminController.products);

module.exports = router;