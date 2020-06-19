const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//set ejs
app.set("view engine", "ejs");
//set body parser and public dir
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //whenever we get a request with _method as a param
//use whatever it is equal to as the method we want to use

//set up mongoose
//fix deprecations
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//set up and connect to restful_blog_app database
mongoose.connect("mongodb://localhost/travel_forum_app");//creates the travel_forum_app database for us in mongodb

/*
//Seed User test
const User = require("./models/user");

var user = new User({
    username:"User1",
    password:"123"
});

user.save((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("user saved");
    }
});*/

//============
//Routes
//============

app.get("/", (req, res) => {
    res.redirect("show"); //redirect to main forum show page
});

app.get("/show", (req, res) => {
    res.render("show");
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Forum Server Started");
});