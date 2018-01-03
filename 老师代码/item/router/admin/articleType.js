var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");

//命名不一定要全部写全，要求是：精简语义化
var artTypeModel = require("../../modles/admin/articleType.js");


router.get("/type",function(req,res,next){
    artTypeModel.findType({},function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.render("admin/arcTypeList",{arcType:result});
    });
    
});

router.post("/addType",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    ArticleType.create(req.query,function(){
        res.send("插入成功");
    });
});


module.exports = router;