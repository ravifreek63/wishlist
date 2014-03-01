var express = require('express');
var app = express();
app.configure(function () {
	app.use(
		"/", //the URL throught which you want to access to you static content
		express.static(__dirname) //where your static content is located in your filesystem
		);
    });
app.get('/hello.txt', function(req, res){
	var body = 'Hello World';
	console.log ("GET REQUEST");
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', Buffer.byteLength(body));
	res.end(body);
    });
app.listen(8000); //the port you want to use