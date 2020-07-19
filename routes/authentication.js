var express = require("express");
var router = express.Router();

//Include passport to authenticate users
var passport = require("passport")

//Models
var User = require("../models/user");
const e = require("express");


//=======================
//Authentication routes
//=======================


//REGISTER ROUTES
//==================

//Sign Up Template
router.get("/register", (req, res) => {
    res.render("authentication/signup");
});


//Sign Up post route
router.post("/register", (req, res) => {
    //Data that user submitted
    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    //Pass user data into object, password separate to be hashed, and a callback
    User.register({username: user.username, email: user.email}, user.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to Travel Forum " + user.username);
                res.redirect("/topics");
            });
        }
    });

    
});


//LOGIN ROUTES
//===============
//Log In Template
router.get("/login", (req, res) => {
    res.render("authentication/login");
});


//login post route
//authenticate locally, and pass in where to redirect on success or failure of log in
//automatically checks the data inputed
router.post("/login", passport.authenticate("local", {successRedirect:"/topics", failureRedirect:"/login"}),
    (req, res) => {
       
});


//logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You logged out");
    res.redirect("/topics");
});




//export routes
module.exports = router;



