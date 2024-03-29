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
        let src = reqBody.img_src;
        let id = reqBody.product_id;
        // add new record
        if (id == "" || id == undefined || id == null) {
            var newId = 0;
            productsJSON.forEach((item) => {
                newId = parseInt(item.id);
            });

            newId++;

            let item = setProductItem(reqBody);
            item.id = newId.toString(); 
            item.img.src = "assets/images/category/default.jpg";

            productsJSON.push(item);

            let return_json = JSON.stringify(productsJSON);
            fs.writeFileSync(productJSONPath, return_json);
        }
        // update the existing record 
        else {
            let returnData = [];
            productsJSON.forEach((item) => {
                if (item.id == id) {
                    item = setProductItem(reqBody);
                    item.id = id;
                    item.img.src = src; 
                }
                returnData.push(item);
            });
            let return_json = JSON.stringify(returnData);
            fs.writeFileSync(productJSONPath, return_json); 
        }

        productsJSON = JSON.parse(fs.readFileSync(productJSONPath)); // sync the updated file
        return res.status(200).json({ success: true, message: "success" });
    } catch (err) {
        return res.status(400).json({
            success: true,
            message: "Failed to add the product",
            data: req.body,
        });
    }
};

// delete the selected category from JSON file
exports.deleteProduct = (req, res) => {
    let addData = [];
    productsJSON.forEach((item) => {
        if (item.id != req.params.product_id) {
            addData.push(item);
        }
    });
    fs.writeFileSync(productJSONPath, JSON.stringify(addData));
    productsJSON = JSON.parse(fs.readFileSync(productJSONPath)); // sync the updated file
    return res.status(200).json({ success: true, message: "success" });
};

// Make product object
const setProductItem = (reqBody) => {
    let item = {
        stock: parseInt(reqBody.stock),
        category_id: reqBody.category_id,
        name: reqBody.product_name,
        brand: reqBody.brand,
        new: (reqBody.new) ? true : false,
        img: {
            alt: slugify(reqBody.product_name),
        },
        price: {
            original: reqBody.original_price,
            sale: reqBody.sale_price,
        },
        description: reqBody.description,
        specification: {
            product_code: reqBody.product_code,
            genre: reqBody.genre,
            release_date: reqBody.release_date,
        },
    };
    return item;
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