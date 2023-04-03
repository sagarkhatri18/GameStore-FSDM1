const admin_data = require('../../data/login.json');
const products = require('../../data/data.json');

// handle the post request from login form of admin panel
exports.login = (req, res) => {
    let admin = admin_data.admin

    let username = req.body.username;
    let password = req.body.password;

    let bothMatch = false;
    admin.forEach(element => {
        if (element.username == username && element.password == password) {
            return bothMatch = true;
        }
    });

    if (bothMatch)
        return res.status(200).json({ success: true, message: 'Successfully loggedin', data: [{ 'username': username }] });
    else
        return res.status(400).json({ success: false, message: 'Sorry, wrong e-mail address or password' });
};

// fetch all the categories from the JSON file
exports.categories = (req, res) => {
    let categories = products.category
    return res.status(200).json({ success: true, message: 'success', data: categories });
};

// fetch all the products from the JSON file
exports.products = (req, res) => {
    let product_lists = products.products
    let returnData = []
    product_lists.forEach(item => {
        (products.category).forEach(category => {
            if (category.id == item.category_id) {
                item['category_name'] = category.name
                returnData.push(item)
            }
        })
    })
    return res.status(200).json({ success: true, message: 'success', data: returnData });
};