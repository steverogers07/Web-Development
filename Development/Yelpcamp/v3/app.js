var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'), 
    seedDB      = require('./seed');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useUnifiedTopology',true);
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp_p3",{useNewUrlParser: true});
seedDB();

app.get("/",function(req,res){
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
	// Get all campgrounds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err) {
			console.log(err);
		} else {
			res.render("index",{campgrounds: allCampgrounds});
		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save tp DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err)
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

//SHOW - shows more info about one campgrounds
app.get("/campgrounds/:id",function(req,res){
	//fnd the campgrounds with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that camground
			res.render("show",{campground: foundCampground});
		}
	});
});

app.listen(3000,() => {
	console.log("The Yelpcamp Server Has Started");
});