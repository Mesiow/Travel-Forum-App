var express = require("express");
var router = express.Router();

//Include passport to authenticate users
var passport = require("passport")

//Models
var User = require("../models/user");


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
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, () => {
                console.log("Success, Welcome " + user.username);
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
    res.redirect("/topics");
});




//export routes
module.exports = router;



