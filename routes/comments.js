var express = require("express");
var router = express.Router({mergeParams:true});
var mongoose = require("mongoose");

//include models
var Post = require("../models/post");
var Comment = require("../models/comment");


//Create comment (POST)
//comment form is on same page as show page so we post to the same area
router.post("/topics/:id", (req, res) => {
    //look up post using id
    console.log("posting ", req.body.comment);
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //create comment 
            var comment = {
                    text: req.body.comment,
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



