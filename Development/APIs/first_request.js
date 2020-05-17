var request = require('request');
request('https://jsonplaceholder.typicode.com/users/1',function(error, response, body){
	//eval(require('locus'));
    if(error){
       console.log("SOMETHING WENT WRONG!");
		console.log(error);
	}
	else {
		if(response.statusCode==200){
			const parsedData = JSON.parse(body);
			//console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);
			console.log(parsedData.name+ ' lives in '+parsedData.address.city);
		}
	}
});