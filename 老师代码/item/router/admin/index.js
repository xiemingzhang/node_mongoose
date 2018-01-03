/*
    后台管理路由首页
*/

var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");

var articleRouter = require("./article.js");//引入文章模块（路由模块）
var articleType = require("./articleType.js");//引入文章模块（路由模块）
var userModel = require("../../modles/user/users.js");

//当我们访问/admin之后，全部都会进入到这个模块来
//后台的入口
router.use("/",function(req,res,next){     
    //权限控制：是否有浏览权限？浏览的权限有多大（根据查询的参数判断即可）？
    if(!req.session.userInfos){
        res.redirect("/login");
    }
    userModel.isAdmin(req.session.userInfos.name,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        //结果只有两种：1是管理员，2是会员
        if(result){
            next();//往下走肯定会进入admin，因为访问的路由就是admin进来的
        }else{
            res.redirect("/");
        }
    });
});

router.get("/",function(req,res,next){
    res.render("admin/index",{});    
});

//引入文章模块路由
router.use(articleRouter);

//引入文章类型模块路由
router.use(articleType);

module.exports = router;

























