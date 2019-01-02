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
        // check if user already exists in our db

        User.findOne({googleid: profile.id}).then((currentUser)=>{  
            if (currentUser) {
                // already have the user
                console.log("User is: ", currentUser);
            } else {  // create user in our db
                // create new User
                new User({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newUser)=>{
                    console.log('new User created: '+newUser);
                })
            }
        });


    }));
