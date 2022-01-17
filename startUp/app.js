'use strict';
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const appRoot = require('app-root-path')

const cors = require("cors");
global.ROOTPATH = __dirname;
var app = express();

app.use(cors());

// Express TCP requests parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Static rendering
app.use(express.static("views"));
app.use('/public', express.static(path.join(appRoot.path, "/public")));
app.set("view engine", "ejs");

// Route definitions
app.use("/api", require("../routes/api"));

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(ROOTPATH + '/views/error/404.ejs'));
});
module.exports = app;