const express = require("express");
const Post = require("../models/post");
const passport = require("passport");
const router = express.Router();

//Get all posts (index route), newest posts come first
router.get("/", function(req, res){
    Post.find({}).sort({createdAt: -1}).exec(function(err, foundPosts){
        if (err) {
            res.json({success: false, msg: "Error finding posts", err: err});
        } else {
            res.json({success: true, msg: "Found posts with success", posts: foundPosts});
        }
    });
});

//Get one single task (show route)
router.get("/:id", passport.authenticate("jwt", {session: false}), checkPostOwnership, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if (err) {
            res.json({success: false, msg: "Error finding post", err: err});
        } else {
            res.json({success: true, msg: "Found post with success", post: foundPost});
        }
    });
});

//Create one post (create route)
router.post("/", passport.authenticate("jwt", {session: false}), function(req, res){
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        username: req.user.username
    };
    Post.create(newPost, function(err, createdPost){
        if (err) {
            res.json({success: false, msg: "Error creating post", err: err});
        } else {
            res.json({success: true, msg: "Created post with success", post: createdPost});
        }
    });
});

//Update one post (update route)
router.put("/:id", passport.authenticate("jwt", {session: false}), checkPostOwnership, function(req, res){
    const newPost = {
        title: req.body.title,
        content: req.body.content,
    };
    Post.findByIdAndUpdate(req.params.id, newPost, function(err, updatedPost){
        if (err) {
            res.json({success: false, msg: "Error updating post", err: err});
        } else {
            res.json({success: true, msg: "Updated post with success"});
        }
    });
});

//Delete one post (delete route)
router.delete("/:id", passport.authenticate("jwt", {session: false}), checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.json({success: false, msg: "Error deleting post", err: err});
        } else {
            res.json({success: true, msg: "Deleted post with success"});
        }
    });
});

function checkPostOwnership (req, res, next){
    Post.findById(req.params.id, function(err, foundPost){
        if (err || !foundPost) {
            res.json({success: false, msg: "Post not found"});
        } else {
            //Compare foundPost id with current user id
            if (foundPost.author.equals(req.user.id)){
                next();
            } else {
                res.json({success: false, msg: "You don't own this post"});
            }
        }
    });
};

module.exports = router;