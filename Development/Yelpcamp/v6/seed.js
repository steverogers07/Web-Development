var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Mesa", 
        image: "https://c8.alamy.com/comp/CP8R9E/desert-camping-in-the-sonoran-desert-east-mesa-az-CP8R9E.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Lectus proin nibh nisl condimentum id venenatis a. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Quis risus sed vulputate odio ut enim blandit. Ornare arcu odio ut sem nulla pharetra diam sit amet. Diam sit amet nisl suscipit adipiscing bibendum. Facilisi cras fermentum odio eu feugiat pretium. Diam quam nulla porttitor massa. Ut porttitor leo a diam sollicitudin tempor. Interdum velit laoreet id donec ultrices tincidunt. Ultrices dui sapien eget mi proin sed libero. Ullamcorper malesuada proin libero nunc consequat interdum varius. Scelerisque felis imperdiet proin fermentum leo. Fermentum odio eu feugiat pretium nibh ipsum consequat. Velit ut tortor pretium viverra suspendisse potenti nullam. Odio ut sem nulla pharetra diam sit. A diam maecenas sed enim ut sem viverra. Sem et tortor consequat id porta."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis a cras semper auctor neque vitae. Urna et pharetra pharetra massa massa ultricies. Morbi tristique senectus et netus. Est ante in nibh mauris cursus mattis. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Ultricies integer quis auctor elit sed vulputate mi sit. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Faucibus turpis in eu mi."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
		    console.log("removed campgrounds!");
			 //add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err)
					} else {
						console.log("added a campground");
						//create a comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("Created new comment");
								}
							});
					    }
				});
			});
		}
    }); 
}

module.exports = seedDB;
