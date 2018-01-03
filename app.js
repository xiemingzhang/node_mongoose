var express = require("express");
var app = express();

bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

var db = require("./config/db.js");


var session = require("express-session");

app.use(session({
    secret: "jia mi de ming zi",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 30 * 1000
    }
}))

//后台模块
app.use("/admin", require("./router/admin"));

//引入用户注册和登录路由模块
app.use(require("./router/users/users.js"));

//会员模块
app.use("/member", function(req, re) {
    res.send("hello member")
})

app.use(require("./router/frontend/index.js"));

//app.use("/")
app.listen("3000")