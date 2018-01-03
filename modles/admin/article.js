var express = require("express");

var router = express.Router();
var util = require("util");
var formidable = require("formidable");

var Arcticle = require("../../schema/admin/Article.js");

var artTypeModel = require("./articleType.js")

module.exports = {
    findArticle: function(params, callback) {
        Arcticle.find(params || {}).populate("type").exec(function(err, art) {
            callback(err, art)
        });
    },
    addArticle: function() {

    },
    addForm: function(req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            // res.writeHead(200, { 'content-type': 'text/plain;charset=UTF-8' });
            // res.write('received upload:\n\n');
            // res.end(util.inspect({ fields: fields, files: files }));
            if (fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content != "") {
                fields.updatetime = fields.createtime = new Date();
                Arcticle.create(fields, function() {
                    callback(err)
                        //res.send("插入成功");
                });

            } else {
                callback(-1)
                    //res.send("填写不及格，请继续填写");
            }
        });
    },
    updateArticle: function(params, callback) {
        Arcticle.findOne(params || {}, function(err, art) {
            if (err) {
                console.log(err)
                return
            }
            artTypeModel.findType({}, function(err, result) {
                if (err) {
                    console.log(err)
                    return
                }
                callback(err, { art: art, artType: result });
            })
        });
    },
    delArticle: function(params, callback) {
        Arcticle.remove(params, function(err) {
            callback(err);
        })
    },
    editForm: function(req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            // res.writeHead(200, { 'content-type': 'text/plain;charset=UTF-8' });
            // res.write('received upload:\n\n');
            // res.end(util.inspect({ fields: fields, files: files }));
            if (fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content != "") {
                fields.updatetime = new Date();
                Arcticle.update(fields, function() {
                    callback(err)
                        //res.send("插入成功");
                });

            } else {
                callback(-1)
                    //res.send("填写不及格，请继续填写");
            }
        });
    }

};