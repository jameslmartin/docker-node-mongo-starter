function p(d) {
	console.log(d);
}

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');

app.use(express.static(__dirname + '/public'));

// pass along connection to db to controllers
app.use(expressMongoDb('mongodb://mongo:27017/app'));
app.use(bodyParser.json());

var users = require('./routes/User.js');
app.use('/users', users);

var server = app.listen('8080', function() {
	p('Express server listening on 8080');
});
