require('dotenv').config();
const app = require('./app');
const serverless = require('serverless-http');

// // // //

module.exports.run = serverless(app)
