var Search = require('./model.js');
var config = require('../config.js');
var rp = require('request-promise-native');
var request = require('request');

exports.newSearch = function(req, res){
  //record search
  var s = new Search({
    searchstring: req.params.searchstring,
    timestamp: new Date()
  });
  s.save(function(err){
    if(err){
      res.status(500).json({
        message: 'Error saving search',
        error: err
      });
    }
  });

  //request search results
  var reqstr = config.googleapi.uri + '?' +
      'key=' + config.googleapi.key + '&' +
      'cx='  + config.googleapi.cx  + '&' +
      'searchType=' + 'image'       + '&' +
      'q='   + req.params.searchstring;
  if(req.query.offset){
    reqstr += '&start=' + req.query.offset;
  }
  request(reqstr, function(err, response, body){
    if(err){
      res.json(err);
    }else if(!response.statusCode == 200){
      res.json({error: res.statusCode});
    }else{
      var items = JSON.parse(body).items;
      var results = [];
      //pull relevant info from each search reult
      for(var i = 0; i < items.length; i++){
        var item = items[i];
        var result = {
          imageurl: item.link,
          alttext: item.snippet,
          pageurl: item.image.contextLink
        }
        results.push(result);
      }
      res.json(results);
    }
  });
}
