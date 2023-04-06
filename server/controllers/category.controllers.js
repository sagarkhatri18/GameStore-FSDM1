const fs = require('fs');
const path = require('path');

// parse the JSON file
const productJSONPath = path.join(__dirname, '../../data/product.json');
let productsJSON = JSON.parse(fs.readFileSync(productJSONPath))

const categoryJSONPath = path.join(__dirname, '../../data/category.json');
let categoryJSON = JSON.parse(fs.readFileSync(categoryJSONPath))


// fetch all the categories from the JSON file
exports.categories = (req, res) => {
    return res.status(200).json({ success: true, message: 'success', data: categoryJSON });
};


// get all products by category id
exports.fetchCategoryProducts = (req, res) => {
    const category_id = req.params.category_id

    let returnData = []
    productsJSON.forEach(item => {
        if (item.category_id == category_id) {
            (categoryJSON).forEach(category => {
                if (category.id == item.category_id) {
                    item['category_name'] = category.name
                    category_name = category.name
                    returnData.push(item)
                }
            })
        }
    })
    return res.status(200).json({ success: true, message: 'success', data: returnData });
}

// handle the post request of add category
exports.addCategory = (req, res) => {
    try {
        // add new record
        if (req.body.category_id == "") {
            var newId = 0
            categoryJSON.forEach(item => {
                newId = parseInt(item.id)
            })

            newId++;

            let addData = {
                "id": newId.toString(),
                "name": req.body.name,
                "alt": slugify(req.body.name),
                "src": "assets/images/category/default.jpg"
            }

            categoryJSON.push(addData)
            fs.writeFileSync(categoryJSONPath, JSON.stringify(categoryJSON));
        }
        // update the existing record 
        else {
            let returnData = []
            categoryJSON.forEach(item => {
                if (item.id == req.body.category_id) {
                    item.name = req.body.name
                    item.alt = slugify(req.body.name)
                }
                returnData.push(item)
            })

            fs.writeFileSync(categoryJSONPath, JSON.stringify(returnData));
        }

        return res.status(200).json({ success: true, message: 'success' });
    } catch (err) {
        return res.status(400).json({ success: true, message: 'Failed to add the category' });
    }
}

// delete the selected category from JSON file
exports.deleteCategory = (req, res) => {
    let addData = []
    categoryJSON.forEach(item => {
        if (item.id != req.params.category_id) {
            addData.push(item)
        }
    })
    fs.writeFileSync(categoryJSONPath, JSON.stringify(addData));
    categoryJSON = JSON.parse(fs.readFileSync(categoryJSONPath)) // sync the updated file
    return res.status(200).json({ success: true, message: 'success' });
}

// convert the string to slug
const slugify = str => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}