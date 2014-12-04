var port=23507;
var express=require('express');

var app=express();
app.use('/', express.static('./src/public/_rps-http-gulp/'));

var server=app.listen(port, listen);

function listen(){
	console.log(server.address());
}
