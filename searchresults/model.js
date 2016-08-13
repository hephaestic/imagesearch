var mongoose = require('mongoose');
var config = require('../config.js')
mongoose.connect(config.mongodb.uri);
var db = mongoose.connection;

db.on('error', function(){
  console.log('DB connection failed');
});

db.once('open', function(){
  console.log('Connected to ' + config.mongodb.uri);
});

var SearchSchema = new mongoose.Schema({
  searchstring: String,
  timestamp: String
});

module.exports = mongoose.model('Search', SearchSchema);
