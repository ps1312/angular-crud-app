const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require('mongoose-unique-validator');

//User schema
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String, required: true},
    name: String
});

userSchema.plugin(uniqueValidator, {message: '{PATH} already exists'});

//User model
const User = mongoose.model("User", userSchema);

module.exports = User;

module.exports.getUserById = function(id, cb){
    User.findById(id, cb);
}

module.exports.getUserByEmail = function(email, cb){
    const query = {email: email};
    User.findOne(query, cb);
}

module.exports.comparePassword = function(password, hash, cb){
    bcrypt.compare(password, hash, function(err, isMatch){
        if (err) {
            throw err;
        } else {
            cb(isMatch);
        }
    });
}

module.exports.addUser = function(newUser, cb){
    //Gen salt
    bcrypt.genSalt(10, function(err, salt){
        //Gen hash based on password
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                throw err;
            } else {
                //Pass hash to user password and save to db
                newUser.password = hash;
                newUser.save(cb);
            }
        });
    });
};