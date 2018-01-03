var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");


var Article = require("../../schema/admin/Article.js");//实体操作对象
var artTypeModel = require("./articleType.js");

//解耦  低耦合高内聚（功能做好）
module.exports = {
    //params：查询条件，callback：回调函数
    findArticle:function(params,callback){
        Article.find(params || {}).populate("type").exec(function(err,art){
            callback(err,art);
        });
    },
    addArticle:function(){
        
    },
    addForm:function(req,callback){
        var form = new formidable.IncomingForm();
    
        form.parse(req, function(err, fields, files) {
            //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
            //用户传入的数据？
            //在此处，需要给用户验证过滤信息
            if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content  != ""){
                fields.updatetime = fields.createtime = new Date();

                Article.create(fields,function(err){
                    callback(err);
                    //res.send("插入成功");
                });
                
            }else{
                //定义一个约定，-1表示参数没有填完
                callback("-1");
                //res.send("填写不及格，请继续填写");
            }

            //res.end(util.inspect({fields: fields, files: files}));
            
            //课下自行先插入数据试试，展开测试
        });
    },
    updateArticle:function(params,callback){
        //查找数据

        Article.findOne(params||{},function(err,art){//查询文章表出一条数据
            if(err){
                console.log(err);
                return;
            }
            artTypeModel.findType({},function(err,result){
                if(err){
                    console.log(err);
                    return;
                }
                callback(err,{art:art,artType:result});
            });
            //callback(err,art);
        });

    },
    delArticle:function(params,callback){
        Article.remove(params,function(err){
            callback(err);
        });
    },
    editForm:function(req,callback){
        var form = new formidable.IncomingForm();
    
        form.parse(req, function(err, fields, files) {
            //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
            //用户传入的数据？
            //在此处，需要给用户验证过滤信息
            if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content  != ""){
                fields.updatetime = new Date();

                Article.update(fields,function(err){
                    callback(err);
                    //res.send("插入成功");
                });
                
            }else{
                //定义一个约定，-1表示参数没有填完
                callback("-1");
                //res.send("填写不及格，请继续填写");
            }

            //res.end(util.inspect({fields: fields, files: files}));
            
            //课下自行先插入数据试试，展开测试
        });
    }

}





















