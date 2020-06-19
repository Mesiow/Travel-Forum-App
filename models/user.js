const mongoose = require("mongoose");

//create schema for a user

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//create model
var User = new mongoose.model("User", userSchema);

//export model for use
module.exports = User;