/*
 * All routes for Status are defined here
 * Since this file is loaded in server.js into api/status,
 *   these routes are mounted onto /status
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
let minutes = 0;

//twilio
let accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

let twilio = require('twilio');
let client = new twilio(accountSid, authToken);

module.exports = (db, inProgressOrder) => {
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
        const templateVars = {orderLists, minutes, inProgressOrder};
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
    minutes = parseInt(req.body.Body);
    let phoneNumber = '+16502414473'; // PHONE NUMBER OF CUSTOMER HERE

    if (!minutes) {
      minutes = 'Sorry your order was declined!';
      db.query(`
        UPDATE orders
        SET order_status = 'Declined'
        FROM (SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
          FROM pizzas
          JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
          JOIN orders ON pizzas_orders.order_id = orders.id) as subquery
          WHERE orders.phone_number = $1;
        `, [phoneNumber])
        .then(data => {res.json(data);})
        .catch(e => res.json({error: e.message }));
    } else if (minutes) {
      db.query(`
        UPDATE orders
        SET order_status = 'Accepted'
        FROM (SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
          FROM pizzas
          JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
          JOIN orders ON pizzas_orders.order_id = orders.id) as subquery
          WHERE orders.phone_number = $1;
        `, [phoneNumber])
        .then(data => {res.json(data);})
        .catch(e => res.json({error: e.message }));

      setTimeout(function() {
        client.messages.create({
          body: 'Your Order is Ready!',
          to: `${toNumber}`,  // REPLACE WITH phoneNumber AFTER
          from: '+16502414473' // From a valid Twilio number
        })
          .then((message) => {
            console.log("text sent");
            console.log(message.sid);
          });

        db.query(`
          UPDATE orders
          SET order_status = 'Completed'
          FROM (SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
            FROM pizzas
            JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
            JOIN orders ON pizzas_orders.order_id = orders.id) as subquery
          WHERE orders.phone_number = $1;
          `, [phoneNumber])
          .then(data => {res.json(data);})
          .catch(e => res.json({error: e.message }));

        minutes = 0;
      }, minutes * 60 * 1000);
    }
  });
  return router;
};


