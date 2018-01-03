var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.set("view engine","ejs");//ejs、jade、swig

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("./public"));

var db = require("./config/db.js");//打开数据库

var session = require("express-session");
app.use(session({
    secret:"jia mi de ming zi",//应用在https的
    resave:false,//是指每次请求都重新设置session
    saveUninitialized:true,//无论有没有session，每次都请求设置一个session
    cookie:{maxAge:60*30*1000}//过期时间，单位毫秒
}));


/*
    前端展示：
    后端管理：
    首页：
    404：
*/

//后台模块  30模块
app.use("/admin",require("./router/admin"));


//引入用户注册和登录路由模块
app.use(require("./router/users/users.js"));

//会员模块  50模块
app.get("/member",function(req,res){
    res.send("Hello member");
});


app.use(require("./router/frontend/index.js"));

//app.use("/")

app.listen(3000);//监听端口号


























