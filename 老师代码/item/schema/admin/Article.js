var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new mongoose.Schema({
    title:String,
    attribute:[],
    author:String,
    type:{
        type:Schema.Types.ObjectId,
        ref:"ArcType"
    },//如果是多个就为数组，如果是单个就为String
    read:Number,
    createtime:Date,
    content:String,
    support:Number,
    Tag:[],
    updatetime:Date    
});



var Article = mongoose.model("Article",articleSchema);

module.exports = Article;


