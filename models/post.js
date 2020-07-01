const mongoose = require("mongoose");

//create schema for a post
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    //created var is of type Date object and Date.now sets 
    //it to the current date as a default value if 
    //we don't specify anything
    created: {type: Date, default: Date.now}
});

//create post model
var Post = new mongoose.model("Post", postSchema);

//export model for use
module.exports = Post;