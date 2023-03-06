var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
});

module.exports = app;