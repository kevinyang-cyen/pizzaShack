/*
 * All routes for Status are defined here
 * Since this file is loaded in server.js into api/status,
 *   these routes are mounted onto /status
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//twilio
let accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

let twilio = require('twilio');
let client = new twilio(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
    FROM pizzas
    JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
    JOIN orders ON pizzas_orders.order_id = orders.id
    WHERE orders.id = 2;
    `)
      .then(data => {
        const orderLists = data.rows;
        const templateVars = {orderLists};
        console.log(templateVars);
        res.render("order_status", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log(req.body.Body);
  });

  return router;
};


