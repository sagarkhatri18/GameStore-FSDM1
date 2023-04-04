var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

// import routes
const adminPanelAPI = require('./routes/admin_panel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
});

// use user api routes.
app.use('/api/admin', adminPanelAPI);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Running at 3000");
});