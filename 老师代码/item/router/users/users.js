/*
    负责文章模块

*/
var express = require("express");

var router = express.Router();

var util = require("util");

var userModel = require("../../modles/user/users.js");//用户注册登录模块

//注册
router.get("/reg",function(req,res,next){
    
    res.render("users/register");
     
});

//注册表单
router.post("/reg",function(req,res,next){
    //插入第一次没问题，需要判断用户是否已经存在
    console.log("Reg loading....");
    var request = req;
    userModel.userFind(req,function(err,result,fields){//查询用户是否存在
        if(err){
            console.log(err);
            return;
        }
        console.log("长度："+result.length);
        //result是查询的数据，fields：是用户输入的数据
        if(result.length == 0){
            userModel.register(fields,function(err){//向数据库插入数据（用户输入的数据）
                if(err){
                    console.log(err);
                    return;
                }
                res.send("注册成功");
            })        
        }else{
            res.send("用户名已经注册，请重新换个");
        }
    });
    /*
    */
    
    /*if(!isLogin){
        insert插入
    }*/
});

//登录
router.get("/login",function(req,res,next){
    res.render("users/login");
     
});

//处理用户登录
router.post("/login",function(req,res,next){
    console.log("login.....");
    userModel.queryUserInfo(req,function(findInfo){
        console.log("login2.....");
        console.log(findInfo);
        console.log("==============");
        if(findInfo == 0){
            res.send("用户名和密码必须填写哦");
        }else if(findInfo == 1){
            res.send("1");
        }else if(findInfo == "admin"){
            res.redirect("/admin");
        }else if(findInfo == "member"){
            res.redirect("/")
        }else if(findInfo == 2){
            res.send("用户名或密码错误");
        }
    });


});


module.exports = router;

