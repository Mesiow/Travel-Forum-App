var express = require("express");
var router = express.Router();


//=======================
//Authentication routes
//=======================

//Sign Up Template
router.get("/register", (req, res) => {
    res.render("authentication/signup");
});


//Log In Template
router.get("/login", (req, res) => {
    res.render("authentication/login");
});




//export routes
module.exports = router;



