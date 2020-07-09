var mongoose = require("mongoose");

//create schema for a post
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    //created var is of type Date object and Date.now sets 
    //it to the current date as a default value if 
    //we don't specify anything
    created: {type: Date, default: Date.now},

    author:{ //Author of the post/topic
        id:{ //a mongoose id that references a User
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String //Author name
    },
    comments:[ //comments is an array of comment id's (Object reference way of associating data)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//create post model
var Post = mongoose.model("Post", postSchema);

//export model for use
module.exports = Post;