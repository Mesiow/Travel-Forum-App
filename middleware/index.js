
var Post = require("../models/post");
var Comment = require("../models/comment");

//store middleware functions into this obj
var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next(); //continue to code after middleware if we're authenticated
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}


middleware.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        //check if user owns the comment
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            }else{
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    return next(); //continue to next code after middleware
                }else{ //user does not own the comment
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back"); //redirects to previous page we were on
    }
}


middleware.checkPostOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        //check if user owns post
        Post.findById(req.params.id, (err, foundPost) => {
            if(err){
                req.flash("error", "Post not found");
                res.redirect("back");
            }else{ //does user own post
                if(foundPost.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middleware;