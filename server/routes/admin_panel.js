const router = require("express").Router();
const adminController = require("../controllers/admin.controllers");
const productController = require("../controllers/product.controller");
const loginController = require("../controllers/login.controller");

router.post("/login", loginController.login);

router.get("/categories", adminController.categories);

router.get("/products", productController.products);

router.post("/add-product", productController.addProduct);

router.delete("/product/:product_id", productController.addProduct);

router.get("/product/:id", productController.fetchSingleProduct);

router.get(
  "/category-products/:category_id",
  adminController.fetchCategoryProducts
);

router.post("/add-category", adminController.addCategory);

router.delete("/category/:category_id", adminController.deleteCategory);

router.get("/homepage", adminController.homePage);

module.exports = router;
