var mongo = require('mongodb');// mongodb already added by package.json
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});//mongodb server by default
db = new Db('commentdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'commentdb' database");
        db.collection('comments', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.allComments = function(req, res) {
    db.collection('comments', function(err, collection) {
        collection.find().toArray(function(err, items) {
			console.log(items);
            res.send(items);
        });
    });
};

exports.addComment = function(req, res) {
    var comment = req.body; // thx bodyParser placed in server.js
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) dd='0'+dd

	if(mm<10) mm='0'+mm

	comment.date = dd+'/'+mm+'/'+yyyy; 
    db.collection('comments', function(err, collection) {
        collection.insert(comment, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}