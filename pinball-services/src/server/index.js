var port=23504;
var express=require('express');

var app=express();
app.use('/', express.static('./src/public/'));

var server=app.listen(port, listen);

function listen(){
	console.log(server.address());
}
