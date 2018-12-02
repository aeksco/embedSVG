require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http')

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

// TODO - handle missing req.query
app.get('/', function(req, res) {
    // const myUrl = 'https://raw.githubusercontent.com/FRMA-Ontology/diagrams/master/concept-maps/oe_12/svg/OE_X_ImageOntology-full.svg'
    request.get(req.query.svgUrl, (err, resp) => {
      const body = resp.body.replace('<svg ', '<svg id="embeddy-svg" style="width:100%;" ')
      res.render('index', { svgXml: body });
    })
});

app.get('/test', function(req, res) {
  res.render('about');
});

// // // //

module.exports.run = serverless(app)
