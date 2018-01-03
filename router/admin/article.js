var express = require("express");

var router = express.Router();

var articleModel = require("../../modles/admin/article.js")
var artTypeModel = require("../../modles/admin/articleType")

router.get("/articleList", function(req, res, next) {
    //title: "my" 
    articleModel.findArticle(req.query, function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        res.render("admin/articleList", { art: result });
    })
});

router.get("/addArticle", function(req, res, next) {

    artTypeModel.findType({}, function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        res.render("admin/addArticle", { type: result });
    });

});

router.post("/addArticle", function(req, res, next) {
    articleModel.addForm(req, function(err) {
            if (err == -1) {
                // console.log(err)
                res.send("没有填完")
                return
            } else if (err) {
                console.log(err)
                return
            }
            res.redirect("./articleList");
        })
        // res.render("admin/addArticle", {});
});

router.get("/delArticle", function(req, res, next) {
    var aid = req.query._id;
    articleModel.delArticle({ _id: aid }, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.send("删除成功")
    })
})

router.get("/editArticle", function(req, res, next) {
    var aid = req.query._id;
    articleModel.updateArticle({ "_id": aid }, function(err, art) {
        res.render("admin/updateArticle", art);
    })
})

router.post("/editArticle", function(req, res, next) {
    articleModel.editForm(req, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.send("修改成功")
    })
})

module.exports = router;