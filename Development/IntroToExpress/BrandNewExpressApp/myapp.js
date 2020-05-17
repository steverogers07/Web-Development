var express = require('express');
var app = express();

app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animalName",function(req,res){
	var animal = req.params.animalName.toLowerCase();
	var sound = "";
    /*if(animal==="pig") sound="Oink";
	else if(animal==="cow") sound="Moo";
	else sound = "Woof Woof";*/
	var sounds = {
		pig : "Oink",
		cow : "Moo",
		dog : "Woof Woof",
		cat : "I hate you Humans",
		goldfish : "..."
	}
	sound = sounds[animal];
	res.send("The "+animal + " says '"+sound+"'");
});

app.get("/repeat/:string/:times",function(req,res){
	var string = req.params.string;
	var times = Number(req.params.times);
	var result ="";
	for(var i=0;i<times;i++)
		{
			result += string+" ";
		}
	res.send(result);
});

app.get("*",function(req,res){
	res.send("Sorry, page not fpund...What are you doing with your life?");
});

app.listen(3000,()=>{
	console.log("Server has Started");
});