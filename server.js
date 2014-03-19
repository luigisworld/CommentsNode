var express = require('express'),
	http = require('http'),
	path = require('path'),
	comment = require('./routes/comments'); //route comments.js
 
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser()); //middleware which allows accessing easily to json parameters
	 // POST { "name": "tobi" }
	 // req.body.name => "tobi"
});
 
 
app.get('/', function(req, res){
	res.sendfile('public/home.html');
});

app.get('/allComments', comment.allComments);//calling allComments method

app.post('/addComment', comment.addComment);//calling addComment method

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});