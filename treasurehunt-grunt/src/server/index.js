var port = 23509;
var express = require('express');

var app = express();
app.use('/', express.static('./src/public/_treasurehunt-grunt'));

var server = app.listen(port, listen);

function listen(){
	console.log(server.address());
}
