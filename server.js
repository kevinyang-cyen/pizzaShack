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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/a", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const pizzas = {
  'pepperoni': {
    name: 'pepperoni',
    cost: 34.50,
    time: "15 minutes",
    toppings: 'Handmade bread dough, Marinara Sauce, Four different types of artisanal cheese, hand-sliced pepperoni, garlic butter brushed crust'
  }
}
//nick test
app.get("/order", (req, res) => {
  const pizzas = {
    'pepperoni': {
      name: 'pepperoni',
      cost: 34.50,
      time: "15 minutes",
      toppings: 'Handmade bread dough, Marinara Sauce, Four different types of artisanal cheese, hand-sliced pepperoni, garlic butter brushed crust'
    }
  }
  const templateVars = { pizzas };
  res.render("order_page_template", templateVars);
});
//kevin
app.get("/status", (req, res) => {
  const templateVars = {};
  res.render("order_status", templateVars);
})



///home page
app.get("/", (req, res) => {
  const pizzas = {
    'pepperoni': {
      name: 'pepperoni',
      cost: 34.50,
      time: "15 minutes",
      ingredients: 'Handmade bread dough, Marinara Sauce, Four different types of artisanal cheese, hand-sliced pepperoni, garlic butter brushed crust'
    }
  }
  const templateVars = {pizzas};
  res.render("home_page", templateVars)
})
//twiollio test
var accountSid = ; // Your Account SID from www.twilio.com/console
var authToken = ;   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

app.post("/", (req,res)=>{

  client.messages.create({
    body: 'Hello from Node',
    to: '',  // Text this number
    from: '+16502414473' // From a valid Twilio number
  })
  .then((message) => {
    console.log("text sent")
    res.redirect("/")
    console.log(message.sid)});

  });
  // client.messages.create({
  //   body: 'Hello from Node',
  //   to: '+16044457299',  // Text this number
  //   from: '+16502414473' // From a valid Twilio number
  // })
  // .then((message) => console.log(message.sid));
  //  console.log("text sent2")
