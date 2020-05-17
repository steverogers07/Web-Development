var express = require("express");
var app=express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var friends = ["PUNIT","TRIPATHI","ANKIT","AAKASH"];

app.get("/",function(req,res){
	res.render("home");
});

app.post("/addfriend",function(req,res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.get("/friends",function(req,res){
	res.render("friends",{friends:friends});
});

app.listen(3000,()=>{
	console.log("Go Ahead");
});