var express = require("express");
var app=express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/fallinlovewith/:thing",function(req,res){
	var thing = req.params.thing;
	res.render("love",{thingVar:thing});
});

app.get("/posts",function(req,res){
	var posts = [
		{title: "Harry Potter", author: "J.K. Rowling"},
		{title: "The Alchemist", author: "Paulo Coelho"},
		{title: "Wings of Fire", author: "A.P.J Abdul Kalam"}
	];
	res.render("posts",{posts:posts});
});

app.listen(3000,()=>{
	console.log("Go Ahead");
});