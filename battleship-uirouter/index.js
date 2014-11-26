var port=23449;
var express=require('express');

var app=express();
app.use('/', express.static('./client/'));

var server=app.listen(port, listen);

function listen(){
	console.log(server.address());
}
