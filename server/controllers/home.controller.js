const fs = require("fs");
const path = require("path");

// parse the JSON file
const productJSONPath = path.join(__dirname, "../../data/product.json");
let productsJSON = JSON.parse(fs.readFileSync(productJSONPath));

const categoryJSONPath = path.join(__dirname, "../../data/category.json");
let categoryJSON = JSON.parse(fs.readFileSync(categoryJSONPath));
// return the homepage section data
exports.homePage = (req, res) => {
  const homePageJSONPath = path.join(__dirname, "../../data/data.json");
  const homePageJSON = JSON.parse(
    fs.readFileSync(homePageJSONPath)
  ).homepage_block;

  let returnData = [];
  homePageJSON.forEach((item) => {
    let data = {
      title: item.title,
      products: [],
    };

    productsJSON.forEach((product) => {
      if (item.product_id.includes(product.id)) {
        categoryJSON.forEach((category) => {
          if (category.id == product.category_id) {
            product["category_name"] = category.name;
            data.products.push(product);
          }
        });
      }
    });
    returnData.push(data);
  });
  return res
    .status(200)
    .json({ success: true, message: "success", data: returnData });
};
