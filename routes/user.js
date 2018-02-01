const express = require("express");
const router = express();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

router.post("/register", function(req, res){
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name
    });

    User.addUser(newUser, function(err, newUser){
        if (err){
            res.json({success: false, msg: "User creation failed", err: err});
        } else {
            res.json({success: true, msg: "User created with success"});
        }
    });
});

router.post("/login", function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    //Get user
    User.getUserByEmail(email, function(err, foundUser){
        if (err) {
            throw err;
        }
        if (!foundUser) {
            return res.json({success: false, msg: "User not found"});
        } else {
            //Compare candidate password to real password
            User.comparePassword(password, foundUser.password, function(isMatch){
                if (isMatch){
                    const token = jwt.sign({user: foundUser}, config.secret, {expiresIn: "7d",})
                    res.json({success: true,    
                        token: "Bearer " + token,
                        user: {
                            id: foundUser._id,
                            email: foundUser.email,
                            name: foundUser.name,
                            username: foundUser.username
                    }});
                } else {
                    return res.json({success: false, msg: "Wrong password"});
                }
            });
        }
    }) ;
});

router.get("/profile", passport.authenticate("jwt", {session: false}), function(req, res){
    res.json({user: req.user});
});

module.exports = router;