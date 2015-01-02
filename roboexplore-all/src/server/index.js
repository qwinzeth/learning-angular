var port = 23508;
var express = require('express');
var options = require('../../gulp/options.js');

var app = express();
app.use('/', express.static(options.appOutput));

var server = app.listen(port, listen);

function listen(){
	console.log(server.address());
}
