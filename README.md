# OAuth with Passport.js
#express #backend #authentication #web

This is the note for course on youtube
[OAuth Login (Passport.js) Tutorial #2 - The OAuth Flow - YouTube](https://www.youtube.com/watch?v=CHodPpqLqG8&index=2&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x)

![](README/Screen%20Shot%202019-01-01%20at%205.00.57%20PM.png)
- - - -
##   Preparation
Quickly build an express app using ejs as view engine.

Create a routes as follow
/ -> home 
/auth -> authRoutes
		/login
		/logout
		/google

## Set up Passport.js
### install
passportgoogle-oauth is one of many so called strategies that Passport.js provided

`npm install passport passport-google-oauth20`

### configuration
new file config/passport-setup.js

```
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');

passport.use(
    new googleStrategy({
        // options for the google strategy
    }), ()=>{
        // passport call back function
    });
```

## Set up Google Strategy
Get Google APIs Key(You know how to do it)

```
// add this file to gitignore
// config/keys.ks

module.exports = {
    google:{
        clientID: 'youkey',
        clidentSecret: 'your secret'
    }
}
```

```
// passport-setup.js

const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require("./keys")
passport.use(
    new googleStrategy({
        // options for the google strategy
        clientID: keys.google.clientID,
        clidentSecret: keys.google.clidentSecret
    }), ()=>{
        // passport call back function
    });

```

## Redirect
after sending user to google’s authentication page, where should user be direct to?
```
passport.use(
    new googleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clidentSecret: keys.google.clidentSecret
    }), ()=>{
        // passport call back function
    });
```

## Using Google’s authentication
```
// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'], // what do you want from google API
}));
```

These code block will send user to google authentication page

## CallBack function
accessToken: received from google, use to access user’s information; expire in a certain amount of time. 

refreshToken: refresh accessToken since accessToken will expire

profile: bring back by the function

done: call when we done 

```
passport.use(
    new googleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clidentSecret: keys.google.clidentSecret
    }, (accessToken, refreshToken, profile, done)=>{
        // passport call back function
    }));

```

