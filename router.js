var router = require('express').Router();
var search = require('./searchresults/controller.js');
var history = require('./searchhistory/history.js');

router.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

router.get('/', function(req, res) {
	res.end('welcome');
});

router.get('/api/imagesearch/:searchstring', function(req, res) {
	search.newSearch(req, res);
});

router.get('/api/latest/imagesearch', function(req, res) {
	history.getHistory(req, res);
});

module.exports = router;
