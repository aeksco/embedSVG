'use strict';
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// // // //

// Express.js App & Configuration
const app = express();

// Cors configuration
app.use(cors());

// App middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sets up static serving of files
// app.use(express.static('public'));

// Sets EJS as the view engine
// app.set('view engine', 'ejs');

const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);