require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

// // // //

// Express.js App & Configuration
const app = express();

// Cors configuration
app.use(cors());

// Sets EJS as the view engine
app.set('view engine', 'ejs');

// Print the request log on console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static client assets
app.use(express.static('client'));

// Home page
app.get('/', function(req, res) { res.render('index'); });

// Embed page
// TODO - handle missing req.query
app.get('/embed', function(req, res) {
    // const myUrl = 'https://raw.githubusercontent.com/FRMA-Ontology/diagrams/master/concept-maps/oe_12/svg/OE_X_ImageOntology-full.svg'

    res.set('X-XSS-Protection', 0)

    request.get(req.query.svgUrl, (err, resp) => {
      const body = resp.body.replace('<svg ', '<svg id="embeddy-svg" style="width:100%;" ')
      res.render('embed', { svgXml: body });
    })
});

// Test page
app.get('/test', function(req, res) {
  res.render('about');
});

// // // //

module.exports = app
