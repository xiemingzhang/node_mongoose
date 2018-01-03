/*
    负责文章模块

*/
var express = require("express");

var router = express.Router();

var artModel = require("../../modles/admin/article.js");//文章业务模块

var artTypeModel = require("../../modles/admin/articleType.js");

//文章列表
router.get("/articleList",function(req,res,next){
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间

    */
    artModel.findArticle(req.query,function(err,result){
        //指挥articleModel去查询数据
        res.render("admin/articleList",{art:result});
    });
     
});

router.get("/addArticle",function(req,res,next){
    //查询分类
    artTypeModel.findType({},function(err,result){
        res.render("admin/addArticle",{type:result});
    });
});

router.post("/addArticle",function(req,res,next){
    //传入"req"对象也就是传入了提交的参数
    artModel.addForm(req,function(err){
        if(err == "-1"){//表示没有填写完成
            //console.log(err);
            res.send("资料没有填完呢");
            return;
        }else if(err){
            console.log(err);
            return;
        }
        res.redirect("/admin/articleList");
    });
    //res.render("admin/addArticle",{});
});

router.get("/delArticle",function(req,res,next){
    //拿到需要删除的文章ID
    var aid = req.query._id;

    artModel.delArticle({_id:aid},function(err){
        if(err){
            console.log(err);
            return;
        }
        res.send("删除成功");
    });


});


router.get("/editArticle",function(req,res,next){
    
    var aid = req.query._id;
    artModel.updateArticle({"_id":aid},function(err,art){
        //.....
        console.log("artModel loading...");
        console.log(art);
        res.render("admin/updateArticle",art);

    });


});

router.post("/editArticle",function(req,res,next){
    artModel.editForm(req,function(err){
        if(err){
            console.log(err);
            return;
        }
        res.send("修改成功");

    })



});


module.exports = router;

