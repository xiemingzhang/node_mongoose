var express = require("express");

var router = express.Router();

var articleRouter = require("./article.js");
var articleTypeRouter = require("./articleType.js");
var userModel = require("../../modles/user/users.js");

router.use("/", function(req, res, next) {
    //权限控制
    if (!req.session.userInfos) {
        res.redirect("/login")
    }
    userModel.isAdmin(req.session.userInfos.name, function(err, result) {
        if (err) {
            console.log(err)
            return;
        }
        if (result) {
            next();
        } else {
            res.redirect("/")
        }
    })

})

router.get("/", function(req, res, next) {
    res.render("admin/index", {})
})

router.use(articleRouter);
router.use(articleTypeRouter);

module.exports = router;