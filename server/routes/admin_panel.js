const router = require("express").Router();
const categoryController = require("../controllers/category.controllers");
const productController = require("../controllers/product.controller");
const loginController = require("../controllers/login.controller");
const homeController = require("../controllers/home.controller");

router.post("/login", loginController.login);

router.get("/categories", categoryController.categories);

router.get("/products", productController.products);

router.post("/add-product", productController.addProduct);

router.delete("/product/:product_id", productController.deleteProduct);

router.get("/product/:id", productController.fetchSingleProduct);

router.get(
  "/category-products/:category_id",
  categoryController.fetchCategoryProducts
);

router.post("/add-category", categoryController.addCategory);

router.delete("/category/:category_id", categoryController.deleteCategory);

router.get("/homepage", homeController.homePage);

module.exports = router;
