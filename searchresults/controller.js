var Search = require('./model.js');
var config = require('../config.js');
//var rp = require('request-promise-native');
var request = require('request');

exports.newSearch = function(req, res) {
	//record search
	var s = new Search({
		searchstring: req.params.searchstring,
		timestamp: new Date()
	});
	s.save(function(err) {
		if (err) {
			res.status(500).json({
				message: 'Error saving search',
				error: err
			});
		}
	});

	//request search results
	var reqstr = config.googleapi.uri + '?' +
		'key=' + config.googleapi.key + '&' +
		'cx=' + config.googleapi.cx + '&' +
		'searchType=' + 'image' + '&' +
		'q=' + req.params.searchstring;
	if (req.query.offset) {
		reqstr += '&start=' + req.query.offset;
	}
	request(reqstr, function(err, response, body) {
		if (err) {
			res.json(err);
		} else if (!response.statusCode == 200) {
			res.json({
				error: res.statusCode
			});
		} else {
			var results = JSON.parse(body).items;
			var simplifiedresults = results.map(function(result) {
				return {
					imageurl: result.link,
					alttext: result.snippet,
					pageurl: result.image.contextLink
				};
			});
			res.json(simplifiedresults);
		}
	});
};
