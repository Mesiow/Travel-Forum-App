const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const flash = require("connect-flash");

//include environment variables
const env = require("./config");

//TODO:
//USE EXPRESS SANITIZE SO NOONE CAN WRITE html scripts IN A COMMENT


//Models
var User = require("./models/user");

//set ejs
app.set("view engine", "ejs");
//set body parser and public dir
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //whenever we get a request with _method as a param
//use whatever it is equal to as the method we want to use
app.use(flash());

//set up mongoose
//fix deprecations
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set("useFindAndModify", false);

//connect to travel_forum_app database
var url = `mongodb+srv://Chris:${env.mongoDBAtlas_password}@cluster0-fzdbs.mongodb.net/travel_forum_app?retryWrites=true&w=majority`
            || env.LOCAL_DATABASEURL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log("Error: ", err.message);
});

//include passport packages
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

app.use(require("express-session")({ //set up express session with express
    secret:"Hello World",
    resave: false,
    saveUninitialized: false
}));


//set up passport with express
app.use(passport.initialize());
app.use(passport.session());


//Passport setup
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //responsible for encoding data
passport.deserializeUser(User.deserializeUser()); //responsible for taking data from the session and unencoding it


//middleware
app.use((req, res, next) => { //make current user available to every template to avoid errors
    res.locals.currentUser = req.user; //allows us to access currentUser in every ejs template
    res.locals.error = req.flash("error"); //lets us access error var in any template
    res.locals.success = req.flash("success");
    next(); //move on to next middleware or route callback func
});


//============
//Routes
//============

//Routes for adding, updating and deleting forum posts
const forumPostRoutes = require("./routes/posts");
const forumCommentRoutes = require("./routes/comments");
const forumAuthRoutes = require("./routes/authentication");

//tell express to use our exported routes
app.use(forumPostRoutes);
app.use(forumCommentRoutes);
app.use(forumAuthRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Forum Server Started");
});