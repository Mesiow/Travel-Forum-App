var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//create schema for a user
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//takes passport local mongoose package and 
//adds methods that comes with the package to the user schema
userSchema.plugin(passportLocalMongoose);

//create model
var User = mongoose.model("User", userSchema);

//export model for use
module.exports = User;