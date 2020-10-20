// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

db.connect();
//dynamic cart object
const cart = {
  'pepperoni': {
    name: 'pepperoni',
    quantity: 0
  },
  'The Terminator':{
    name:'The Terminator',
    quantity:0
  },
  'Meat Lovers':{
    name:'Meat Lovers',
    quantity:0
  }


}
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const ordersRoutes = require("./routes/orders");
const getCart = require('./routes/orders3.js')
const statusRoutes = require("./routes/status");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
const inProgressOrder = false;
app.use("/", ordersRoutes(db, inProgressOrder));
app.use("/order",getCart(db));
app.use("/status",statusRoutes(db));
// Note: mount other resources here, using the same pattern above



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//twilio test
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


app.post("/order", (req, res) => {

  client.messages.create({
    body: 'Hello from Node',
    to: `${toNumber}`,  // Text this number
    from: '+16502414473' // From a valid Twilio number
  })
    .then((message) => {
      console.log("text sent")
      res.redirect("/")
      console.log(message.sid)
    });

});

app.post('/status', (req, res) => {
  console.log(req.body.Body);
});

