var express = require("express");
var router = express.Router({mergeParams:true});
var mongoose = require("mongoose");

//include models
var Post = require("../models/post");
var Comment = require("../models/comment");
//middleware
var middleware = require("../middleware/index");


//Create comment (POST)
//comment form is on same page as show page so we post to the same area
router.post("/topics/:id", middleware.isLoggedIn, (req, res) => {
    //look up post using id
    console.log(req.body);
    console.log("posting ", req.body.comment);

    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                }else{
                    //store current user id and current author logged in, into the comment author and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();

                    //push comment into posts comment array
                    foundpost.comments.push(comment);
                    foundpost.save();
                    
                    res.redirect("/topics/" + req.params.id);
                }
            });
        }
    });
});

//Delete Comment
router.delete("/topics/:id/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    //find comment by id and remove
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Comment deleted");
            //redirect back to post we delete comment from
            res.redirect("/topics/" + req.params.id);
        }
    })
});

module.exports = router;



