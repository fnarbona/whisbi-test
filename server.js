var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function () {
	console.log('Listening on ' + port);
});
