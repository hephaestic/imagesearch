const app = require('express')();
//const jade = require('jade');

const config = require('./config.js');
const router = require('./router.js');

app.set('view engine', 'jade');
app.set('views', __dirname);

app.use('/', router);


app.listen(config.express.port, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Listening on port: ' + config.express.port);
  }
});
