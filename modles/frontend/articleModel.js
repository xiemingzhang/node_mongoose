var express = require("express");

var router = express.Router();
var util = require("util");
var formidable = require("formidable");

var Arcticle = require("../../schema/admin/Article.js");
var Comment = require("../../schema/admin/Comment.js");

module.exports = {
    findList: function(params, callback) {
        Arcticle.find(params || {}, function(err, result) {
            callback(err, result)
        })
    },
    artDetail: function(params, callback) {
        Arcticle.findOne(params || {}, function(err, result) {
            callback(err, result);
        })
    },
    addComment: function(req, callback) {
        var obj = req.body;
        obj.createtime = new Date();
        obj.author = req.session.userInfos ? req.session.userInfos : "匿名";
        Comment.create(obj, function(err) {
            callback(err);
        })
    },
    findComment: function(artId, callback) {
        Comment.find(artId || {}, function(err, result) {
            callback(err, result);
        })
    },
}