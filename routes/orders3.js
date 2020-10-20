/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cart = require("../server.js");


//twilio
let accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

let twilio = require('twilio');
let client = new twilio(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM pizzas;`)
      .then(data => {
        const pizzas = data.rows;
        const templateVars = {pizzas,cart};

        res.render("order_page_template", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {

    client.messages.create({
      body: 'Hello from Node',
      to: `${toNumber}`,  // Text this number
      from: '+16502414473' // From a valid Twilio number
    })
      .then((message) => {
        console.log("text sent");
        res.redirect("/status");
        console.log(message.sid);
      });

  });


  return router;
};
