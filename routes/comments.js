var express = require("express");
var router = express.Router({mergeParams:true});
var mongoose = require("mongoose");

//include models
var Post = require("../models/post");
var Comment = require("../models/comment");


//Create comment (POST)
//comment form is on same page as show page so we post to the same area
router.post("/topics/:id", (req, res) => {
    //check if comment posted is a reply or regular comment
    var commnt;
    if(req.body.comment === undefined && req.body.reply_comment !== undefined){
        //comment is reply comment
        commnt = req.body.reply_comment;
    }else{ //regular comment
        commnt = req.body.comment;
    }

    //look up post using id
    console.log("posting ", commnt);
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //create comment 
            var comment = {
                    text: commnt,
                    author: "Bob"
            }
            Comment.create(comment, (err, comment) => {
                if(err){
                    console.log(err);
                }else{
                    //push comment into posts comment array
                    foundpost.comments.push(comment);
                    foundpost.save();
                    
                    res.redirect("/topics/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;



