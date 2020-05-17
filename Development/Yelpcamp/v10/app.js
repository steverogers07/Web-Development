var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	passport    = require("passport"),
	Localstrategy  = require("passport-local"),
	methodOverride = require("method-override"),
    Campground  = require("./models/campground"), 
	Comment     = require("./models/comment"),
	User        = require("./models/user"),
    seedDB      = require("./seed");

//requiring routes
var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes		 = require("./routes/index")

app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify', false);
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp_v10",{useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000,() => {
	console.log("The Yelpcamp Server Has Started");
});