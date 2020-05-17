var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722878d3914ec65d_340.jpg"},
		{name: "Granite Hill", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e722c7cd2944ec0_340.jpg"},
		{name: "Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722878d3914ec65d_340.jpg"}
	];

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(3000,() => {
	console.log("The Yelpcamp Server Has Started");
});