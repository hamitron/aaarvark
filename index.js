var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var port = 3000;
var json_path = "./canned_json/"

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req,res,next) {
	next();
});

router.route('/:filename')
	.get(function(req,res) {
		var requestParam = req.params['filename'];
		var concatPath = json_path.concat(requestParam, ".json");
		try {
			// look for file
			var filePathForJson = require(concatPath);
		} catch (e) {
			// send 404 if not found
			res.sendStatus(404)
		}
		res.json(filePathForJson);
});

router.get('/', function(req, res) {
	var root = require('./canned_json/root.json')
	res.json(root);
});

app.use('/', router);

app.listen(port, function () {
	console.log('aaarvark is go')
});