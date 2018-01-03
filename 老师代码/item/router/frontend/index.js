/*
    负责文章模块

*/
var express = require("express");

var router = express.Router();

var artModel = require("../../modles/frontend/artModel.js");//文章业务模块

var artTypeModel = require("../../modles/admin/articleType.js");

//文章列表
router.get("/", function (req, res, next) {
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间

    */
    artModel.findList(req.query, function (err, result) {
        //指挥articleModel去查询数据
        res.render("frontend/index", { art: result });
    });

});

router.get("/detail", function (req, res, next) {
    var aid = req.query._id;

    artModel.artDetail({ _id: aid }, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var currUser = req.session.userInfos?req.session.userInfos.name:"未登录";
        res.render("frontend/article", { art: result,username:currUser});
    });

});

router.post("/addComment", function (req, res, next) {
    artModel.addComment(req, function () {
        //添加完成之后，加载新的列表
        artModel.findComment({ article: req.body._id }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.json(result);
        });
    });
});

router.get("/commentList",function(req,res,next){
    artModel.findComment({ article: req.body._id }, function (err, result) {
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

