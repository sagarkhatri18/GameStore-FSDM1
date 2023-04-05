const admin_data = require("../../data/login.json");
const products = require("../../data/product.json");
const fs = require("fs");
const path = require("path");

// parse the JSON file
const productJSONPath = path.join(__dirname, "../../data/product.json");
let productsJSON = JSON.parse(fs.readFileSync(productJSONPath));

const categoryJSONPath = path.join(__dirname, "../../data/category.json");
let categoryJSON = JSON.parse(fs.readFileSync(categoryJSONPath));

// fetch all the products from the JSON file
exports.products = (req, res) => {
  let returnData = [];
  productsJSON.forEach((item) => {
    categoryJSON.forEach((category) => {
      if (category.id == item.category_id) {
        item["category_name"] = category.name;
        returnData.push(item);
      }
    });
  });
  return res
    .status(200)
    .json({ success: true, message: "success", data: returnData });
};

// get one single product details
exports.fetchSingleProduct = (req, res) => {
  const product_id = req.params.id;

  let returnData = "";
  productsJSON.forEach((item) => {
    if (item.id == product_id) {
      categoryJSON.forEach((category) => {
        if (category.id == item.category_id) {
          item["category_name"] = category.name;
          returnData = item;
        }
      });
    }
  });
  return res
    .status(200)
    .json({ success: true, message: "success", data: returnData });
};

// handle the post request of add product
exports.addProduct = (req, res) => {
  try {
    let reqBody = req.body;
    console.log(reqBody, " jsonString");
    let temp = JSON.parse(reqBody);
    console.log(temp, " json");
    let resL = setProductItem(temp);
    /* Returning here temporarily for testing whether the json is valid */
    return res
      .status(200)
      .json({ success: true, message: "success", data: reqBody });
    // add new record
    // let reqBody = req.body;
    if (reqBody.product_id == "") {
      var newId = 0;
      productsJSON.forEach((item) => {
        newId = parseInt(item.id);
      });

      newId++;

      let item = setProductItem(reqBody);
      item.id = newId.toString();

      productsJSON.push(item);
      fs.writeFileSync(productJSONPath, JSON.stringify(productsJSON));
    }
    // update the existing record
    else {
      let returnData = [];
      productsJSON.forEach((item) => {
        if (item.id == reqBody.product_id) {
          item = setProductItem(item);
        }
        returnData.push(item);
      });

      fs.writeFileSync(categoryJSONPath, JSON.stringify(returnData));
    }

    return res.status(200).json({ success: true, message: "success" });
  } catch (err) {
    return res.status(400).json({
      success: true,
      message: "Failed to add the product",
      data: req.body,
    });
  }
};

const setProductItem = (reqBody) => {
  console.log(reqBody, " reqBody");
  let reqSpecification = reqBody.specification;
  let item = {
    category_id: reqBody.category_id,
    name: reqBody.name,
    brand: reqBody.brand,
    new: reqBody.new,
    img: {
      alt: slugify(reqBody.name),
      src: reqBody.src,
    },
    price: {
      original: reqBody.price.original,
      sale: reqBody.price.sale,
    },
    description: reqBody.description,
    // TODO
    specification: {
      product_code: reqSpecification.product_code,
      ideal_for: reqSpecification.ideal_for,
      Genre: reqSpecification.Genre,
      release_date: reqSpecification.release_date,
    },
  };
  console.log(item, " item");
  return item;
};

// delete the selected category from JSON file
exports.deleteProduct = (req, res) => {
  let addData = [];
  productsJSON.forEach((item) => {
    if (item.id != req.params.products_id) {
      addData.push(item);
    }
  });
  fs.writeFileSync(productJSONPath, JSON.stringify(addData));
  productsJSON = JSON.parse(fs.readFileSync(productJSONPath)); // sync the updated file
  return res.status(200).json({ success: true, message: "success" });
};

// convert the string to slug
const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
