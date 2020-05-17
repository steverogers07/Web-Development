var faker = require('faker');



for(var i=0;i<10;i++){
	//var randomName = faker.name.findName();
	//var randomPrice = faker.commerce.price();
	//console.log(randomName+" - $"+randomPrice);
	console.log(faker.fake("{{name.findName}} - ${{commerce.price}}"));
}

