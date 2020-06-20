//Posts routes for each post a user creates

const express = require("express");
const router = express.Router(); //add routes to this var
//include post model
var Post = require("../models/post");

//Root route, directs to show page
router.get("/", (req, res) => {
    res.redirect("show");
});


router.get("/show", (req, res) => {
    //find all posts/topics with the mongoose in the database
    //and render each one

    res.render("show");
});


//Forum post Post route
router.post("/show", (req, res) => {
    //retrieve post data from form
    //get author of post

    //add new post to the database
});


//New route - show form to create post topic
router.get("/new", (req, res) =>{

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

