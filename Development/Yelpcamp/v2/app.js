var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useUnifiedTopology',true);
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/*Campground.create(
	{
	   name: "Granite Hill", 
                image:"https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1577107474%2Fi8put0vegnqgwumh69qz.jpg",
		description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
    }, function(err,campground){
	   if(err){
          console.log("SOMETHING WENT WRONG!");
		  console.log(err);
	   } else {
		  console.log("NEWLY CREATED CAMPGROUND: ");
		  console.log(campground);
	   }
    });*/

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
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err)
		} else {
			//render show template with that camground
			res.render("show",{campground: foundCampground});
		}
	});
});

app.listen(3000,() => {
	console.log("The Yelpcamp Server Has Started");
});