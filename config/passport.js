const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport-jwt");
const User = require("../models/user");
const config = require("../config/index");

module.exports = function(passport){
    let opts = {};
    
    opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new jwtStrategy(opts, function(jwt_payload, done){
        User.findById(jwt_payload.user._id, function(err, foundUser){
            if (err){
                return done(err, false);
            }
            if (foundUser){
                return done(null, foundUser);
            } else {
                return done(null, false);
            }
        });
    }));
}
