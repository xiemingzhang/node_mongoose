var express = require("express");

var router = express.Router();
var util = require("util");
var formidable = require("formidable");

var artTypeModel = require("../../modles/admin/articleType.js")

router.get("/Type", function(req, res, next) {
    artTypeModel.findType({}, function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        res.render("admin/arcTypeList", { arcType: result });
    })
})

router.post("/addType", function(req, res, next) {
    ArcticleType.create(req.query, function() {
        res.send("插入成功")
    })
})

module.exports = router;