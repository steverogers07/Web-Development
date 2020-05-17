var express = require('express');
var app = express();

// "/" => "Hi there!"
app.get("/",function(req,res){
	res.send("Hi there");
});

// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
	res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog",function(req,res){
	res.send("MEOW!");
	console.log("SOMEONE MADE A REQUEST TO console.log");
});

app.get("/r/:subredditName",function(req,res){
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO THE "+ subreddit.toUpperCase() + " SUBREDDIT");
});

app.get("*",function(req,res){
     res.send("You are Superhuman!!")
});

//Tell Express to listen for request (start server)
app.listen(3000,()=>{
	console.log("Server has started!!");
});