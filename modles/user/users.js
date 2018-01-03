var express = require("express");

var router = express.Router();

var crypto = require("crypto");

var formidable = require("formidable");



var Users = require("../../schema/user/User.js");

module.exports = {
    register: function(fields, callback) {

        //在此处，需要给用户验证过滤信息
        //用户验证这里只是留了一个口子，真正在公司项目中需要把这一块完善
        if (fields.username != "" && fields.password != "") {
            var md5 = crypto.createHash("md5");
            fields.password = md5.update(fields.password).digest("base64");
            fields.regtime = fields.updatetime = new Date();
            fields.rank = 1; //标记用户等级的，可以定义一个规则，比如用户1-10表示普通用户，11-20表示管理员
            console.log("formidable.....");
            console.log(fields);
            Users.create(fields, function(err) {
                callback(err);
                //res.send("插入成功");
            });

        } else {
            //定义一个约定，-1表示参数没有填完
            callback("-1");
            //res.send("填写不及格，请继续填写");
        }
    },
    userFind: function(req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
            //用户传入的数据？
            //在此处，需要给用户验证过滤信息
            //用户验证这里只是留了一个口子，真正在公司项目中需要把这一块完善
            if (fields.username != "" && fields.password != "") {
                Users.find({ username: fields.username }, function(err, result) {
                    callback(err, result, fields);
                });

            } else {
                //定义一个约定，-1表示参数没有填完
                callback("-1");
                //res.send("填写不及格，请继续填写");
            }

            //res.end(util.inspect({fields: fields, files: files}));

            //课下自行先插入数据试试，展开测试
        });
    },
    queryUserInfo: function(req, callback) {

        if (req.body.username == "" || req.body.password == "") {
            callback(0); //0表示用户名和密码有一个没有填写
            return;
        }

        Users.findOne({ username: req.body.username }, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("-------");
            console.log(req.body);
            var md5 = crypto.createHash("md5");
            //MD5加密不能反编译
            req.body.password = md5.update(req.body.password).digest("base64");
            console.log(result);
            if (result == null) {
                //没有注册
                callback(1);
            } else if (result.username == req.body.username && result.password == req.body.password) {
                //rank：记录权限登记  0-10普通用户，11-20管理员
                //设置session，但是在开发时需要注意，每次重启之后session会消失
                req.session.userInfos = { name: result.username, sign: true };
                /*
                    为什么不把rank加入缓存
                    假如我们把rank保存到缓存了，确实从访问上很方便
                    由于session直接判断了登录之后的就是管理员，那么换句话来说，如果此时有一个超级管理员把你的管理权限干掉了，变成了普通会员，但是session依然会告诉你，你现在依然还是管理员
                    解决方式：
                    1、每次去查询，当前用户是否有权限
                    2、把等级信息记录在缓存当中，当后台修改时，更新缓存即可

                */
                if (result.rank > 10) {
                    callback("admin");
                } else {
                    callback("member");
                }
            } else {
                callback(2);
            }
        });

    },
    isAdmin: function(username, callback) {
        Users.findOne({ username: username }, function(err, result) {
            if (result.rank > 10) {
                callback(err, true)
            } else {
                callback(err, false)
            }
        })
    }
};