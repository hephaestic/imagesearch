var Search = require('../searchresults/model.js');

module.exports.getHistory = function(req, res){
  Search.find({}, '-_id searchstring timestamp', function(err, searches){
    if(err){
      res.status(500).json({
        message: 'Error getting searches'
      });
    } else {
      res.json(searches);
    }
  });
};
