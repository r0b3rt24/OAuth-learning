const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup")
const mongoose = require("mongoose")
const keys = require('./config/keys')
const cookieSession = require("cookie-session")
const passport = require('passport');

const app = express();

//connect to mongobd
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log("connected to the DB")
})

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up view engine
app.set("view engine", 'ejs');

// set up routes
app.use('/auth', authRoutes); 

app.get('/', (req, res)=>{
    res.render('home');
})


app.listen(3000, ()=>{
    console.log('app now listening on port 3000')
})
