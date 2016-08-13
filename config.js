var production = process.env.NODE_env === 'production';

var config = {
  express:{
    port: process.env.PORT || 3000
  },
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/imagesearch'
  },
  googleapi:{
    key: 'AIzaSyCYd1eOWHGWtALXJ0kei3Nf92VNKg-AzHg',
    cx: '000280771458258133914:r9io0emcazo',
    uri: 'https://www.googleapis.com/customsearch/v1'
  },
  oauth:{
    clientid: '265785840999-eukeb46a30en249rv35k500ub66dlqeb.apps.googleusercontent.com',
    clientsecret: 'dL1wjIfO0LwR4EwOiIe1kU4g'
  }
};

module.exports = config;
