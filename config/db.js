var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/item", { useMongoClient: true })

var db = mongoose.connection;

db.once("open", function() {
    console.log("数据库成功打开")
});

module.exports = db;