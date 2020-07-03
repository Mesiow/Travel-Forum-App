//Posts routes for each post a user creates

const express = require("express");
const router = express.Router(); //add routes to this var

//include post model
var Post = require("../models/post");

//Seed data
const seedDB = require("../seed");
seedDB();

//Root route, directs to show page
router.get("/", (req, res) => {
    res.redirect("topics");
});


router.get("/topics", (req, res) => {
    //find all posts/topics with mongoose in the mongodb database
    Post.find({}, (err, allposts) => {
        if(err){
            console.log(err);
        }else{
            //render show template and pass in all posts
            res.render("main", {posts: allposts});
        }
    });
});


//Forum post Post route
router.post("/topics", (req, res) => {
    //get author of post

    //retrieve post data from form
    //check if img selected is from locally or a link
    //if no local img selected
    var image_type;
    if(req.body.content.image_local === ""){
        image_type = req.body.content.image_link;
    }else{
        image_type = req.body.content.image_local;
    }

    var newPost = {
        title: req.body.content.title,
        image: image_type,
        body: req.body.content.body
        //created var has default value already
    }

    //add new post to the database
    Post.create(newPost, (err, post) => {
        if(err){
            console.log(err);
        }else{
            //redirect back to forum show page (get request)
            res.redirect("/topics");
        }
    });
});


//New route - show form to create post topic
router.get("/topics/new", (req, res) =>{
    res.render("new");
});


//Show route - shows more info about one post topic
router.get("/topics/:id", (req, res) => {
    //find post topic with provided id
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //render show template of that post with that id
            res.render("show", {post: foundpost});
        }
    });
    //grab comment id and populate the comments array with the data associated at the id
});


//Edit post - edit a post if it is yours
router.get("/topics/:id/edit", (req, res) => {
    //find post by id and show the edit form
});


//Update post - update a post after editing
router.put("/topics/:id", (req, res) => {
    //find post by id and update it, then render it
});


//Delete post - delete a post from the forum if it's yours
router.delete("/topics/:id", (req, res) =>{
    //find post by id and remove it
});


//export all forum post routes to be used
module.exports = router;

