const mongoose = require("mongoose");

//comment schema
var commentSchema = new mongoose.Schema({
    text: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId, //id of User
            ref: "User" //model to refer to
        },
        username: String //Author name
    }
});

var Comment = new mongoose.model("Comment", commentSchema);

//export
module.exports = Comment;