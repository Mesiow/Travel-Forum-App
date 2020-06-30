//Posts routes for each post a user creates

const express = require("express");
const router = express.Router(); //add routes to this var
//include post model
var Post = require("../models/post");

//Scripts
var newRouteScript = require("../public/scripts/new")

//Root route, directs to show page
router.get("/", (req, res) => {
    res.redirect("show");
});


router.get("/show", (req, res) => {
    //TODO: Add post data to render in show ejs file template

    //find all posts/topics with mongoose in the mongodb database
    Post.find({}, (err, allposts) => {
        if(err){
            console.log(err);
        }else{
            //render show template and pass in all posts
            res.render("show", {posts: allposts});
        }
    });
});


//Forum post Post route
router.post("/show", (req, res) => {
    //get author of post

    //retrieve post data from form
    var newPost = {
        title: req.body.content.title,
        image: req.body.content.image,
        body: req.body.content.body
    }

    //add new post to the database
    Post.create(newPost, (err, post) => {
        if(err){
            console.log(err);
        }else{
            //redirect back to forum show page (get request)
            res.redirect("show");
        }
    });
});


//New route - show form to create post topic
router.get("/new", (req, res) =>{
    res.render("new");
});


//Show route - shows more info about one post topic
router.get("/show/:id", (req, res) => {
    //find post topic with provided id
    //grab comment id and populate the comments array with the data associated at the id

     //render show template of that post with that id
});


//Edit post - edit a post if it is yours
router.get("/show/:id/edit", (req, res) => {
    //find post by id and show the edit form
});


//Update post - update a post after editing
router.put("/show/:id", (req, res) => {
    //find post by id and update it, then render it
});


//Delete post - delete a post from the forum if it's yours
router.delete("/show/:id", (req, res) =>{
    //find post by id and remove it
});


//export all forum post routes to be used
module.exports = router;

