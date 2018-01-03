var express = require("express");

var router = express.Router();

var formidable = require("formidable");

var userModel = require("../../modles/user/users.js"); //用户注册登录模块

//注册
router.get("/reg", function(req, res, next) {

    res.render("users/register");

});

router.post("/reg", function(req, res, next) {
    var request = req;
    userModel.userFind(req, function(err, result, fields) { //查询用户是否存在
        if (err) {
            console.log(err);
            return;
        }
        console.log("长度：" + result.length);
        //result是查询的数据，fields：是用户输入的数据
        if (result.length == 0) {
            userModel.register(fields, function(err) { //向数据库插入数据（用户输入的数据）
                if (err) {
                    console.log(err);
                    return;
                }
                res.send("注册成功");
            })
        } else {
            res.send("用户名已经注册，请重新换个");
        }
    });
});

router.get("/login", function(req, res, next) {
    res.render("users/login")
})

router.post("/login", function(req, res, next) {
    userModel.queryUserInfo(req, function(findInfo) {
        if (findInfo == 0) {
            res.send("必须填写用户名和密码")
        } else if (findInfo == 1) {
            res.send("1")
        } else if (findInfo == "admin") {
            res.redirect("/admin")
        } else if (findInfo == "member") {
            res.redirect("/")
        } else if (findInfo == 2) {
            res.send("用户名和密码错误")
        }
    })
})
module.exports = router;