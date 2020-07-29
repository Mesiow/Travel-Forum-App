//Posts routes for each post a user creates

const express = require("express");
const router = express.Router(); //add routes to this var

//include post model
var Post = require("../models/post");
//include middleware
var middleware = require("../middleware/index");

//Seed data
/*const seedDB = require("../seed");
seedDB();*/

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
//middleware checks if we are logged in first
router.post("/topics", middleware.isLoggedIn, (req, res) => {
    //get author of post

    //retrieve post data from form
    //check if img selected is from locally or a link
    //if no local img selected
    var image_type;
    if(req.body.topic.image_local === ""){
        image_type = req.body.topic.image_link;
    }else{
        image_type = req.body.topic.image_local;
    }

    var author = { //grab author of the post/topic
        id: req.user._id,
        username: req.user.username
    }
    //sanitize content of body (remove any html tags or scripts)
    req.body.topic.body = req.sanitize(req.body.topic.body);
    var newPost = {
        title: req.body.topic.title,
        image: image_type,
        body: req.body.topic.body,
        author: author
        //created(time) var has default value already
    }

    //add new post to the database
    Post.create(newPost, (err, post) => {
        if(err){
            console.log(err);
        }else{
            //redirect back to forum show page (get request)
            req.flash("success", "New topic submitted");
            res.redirect("/topics");
        }
    });
});


//New route - show form to create post topic
router.get("/topics/new", middleware.isLoggedIn, (req, res) =>{
    res.render("topics/new");
});


//Show route - shows more info about one post topic
router.get("/topics/:id", (req, res) => {
    //find post topic with provided id
    //grab post id and populate the comments array with the data associated at the id in the array
    Post.findById(req.params.id).populate("comments").exec((err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //render show template of that post with that id
            res.render("topics/show", {post: foundpost});
        }
    });
});


//Edit post - edit a topic if it is yours
router.get("/topics/:id/edit", middleware.checkPostOwnership, (req, res) => {
    //find post by id and show the edit form
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //render edit template for the specific topic with that id
            console.log(foundpost);
            res.render("topics/edit", {post: foundpost});
        }
    });
});


//Update post - update a post after editing
router.put("/topics/:id", middleware.checkPostOwnership, (req, res) => {
    //sanitize body before updating
    req.body.topic.body = req.sanitize(req.body.topic.body);
    
    //find post by id and update it, then render it
    //this method takes the id of the topic, the new topic data to update the old (submitted by the form)
    Post.findByIdAndUpdate(req.params.id, req.body.topic, (err, foundpost) => {
        if(err){
            console.log(err);
        }else{
            //redirect to updated post
            res.redirect("/topics/" + req.params.id);
        }
    });
});


//Delete post - delete a post from the forum if it's yours
router.delete("/topics/:id", middleware.checkPostOwnership, (req, res) =>{
    //find post by id and remove it
    Post.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/topics");
        }
    })
});


//export all forum post routes to be used
module.exports = router;

