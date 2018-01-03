var express = require("express");

var router = express.Router();
var util = require("util");
var formidable = require("formidable");

var articleType = require("../../schema/admin/ArticleType.js")

module.exports = {
    findType: function(params, callback) {
        articleType.find(params || {}, function(err, result) {
            callback(err, result);
        })
    }
}