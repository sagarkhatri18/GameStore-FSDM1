const admin_data = require("../../data/login.json");
// handle the post request from login form of admin panel
exports.login = (req, res) => {
  let admin = admin_data.admin;

  let username = req.body.username;
  let password = req.body.password;

  let bothMatch = false;
  admin.forEach((element) => {
    if (element.username == username && element.password == password) {
      return (bothMatch = true);
    }
  });

  if (bothMatch)
    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully loggedin",
        data: [{ username: username }],
      });
  else
    return res
      .status(400)
      .json({
        success: false,
        message: "Sorry, wrong e-mail address or password",
      });
};
