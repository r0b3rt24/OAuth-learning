const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require("./keys");
const User = require("../models/user-model")
passport.use(
    new googleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=>{
        // passport call back function
        console.log(profile);
        // create new User
        new User({
            username: profile.displayName,
            googleid: profile.id
        }).save().then((newUser)=>{
            console.log('new User created: '+newUser);
        })
    }));
