var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");


var ArticleType = require("../../schema/admin/ArticleType.js");

module.exports = {
    //一般情况异步获取都有回调函数，除非使用ES6/ES6的语法糖
    findType:function(params,callback){
        ArticleType.find(params || {},function(err,result){
            callback(err,result);
        });
    }
}