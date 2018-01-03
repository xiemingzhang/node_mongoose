var express = require("express");

var router = express.Router();

var articleModel = require("../../modles/frontend/articleModel.js")
var artTypeModel = require("../../modles/frontend/articleTypeModel.js")

router.get("/", function(req, res, next) {
    articleModel.findList(req.query, function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        res.render("frontend/index", { art: result });
    })
});

router.get("/detail", function(req, res, next) {
    var aid = req.query._id;
    articleModel.artDetail({ _id: aid }, function(err, result) {
        if (err) {
            console.log(err)
            return;
        }
        var currUser = req.session.userInfos ? req.session.userInfos.name : "未登录";
        console.log(req.session.userInfos)
        res.render("frontend/article", { art: result, username: currUser });
    })
});

router.post("/addComment", function(req, res, next) {
    articleModel.addComment(req, function() {
        //添加完成之后，加载新的列表
        articleModel.findComment({ article: req.body._id }, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.json(result);
        });
    });
});

router.get("/commentList", function(req, res, next) {
    articleModel.findComment({ article: req.body._id }, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        /*
            接口格式：
            {
                message:"提示文字",
                success:true/false,
                data:list
            }
        */
        res.json(result);
    });
});

module.exports = router;