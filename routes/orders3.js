/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cart = require("./cart.js");
const cartHelper = require("../helperFunctions/cartHelper.js")

//twilio
let accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

let twilio = require('twilio');
// const { query } = require('express');
let client = new twilio(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    let pizzaInCart = cartHelper(cart);


    // console.log(pizzaInCart, 'PIZZA in CART');
    const query = `SELECT * from pizzas WHERE name = ANY(array[${pizzaInCart}]);`
    // console.log(query, "query");
    db.query(query)
      .then(data => {
        const pizzas = data.rows;
        const templateVars = { pizzas, cart };
        // console.log(templateVars, 'template vars');
        res.render("order_page_template", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const name = req.body.name;
    const phone = req.body.contactNumber;
    const orderQuery = `INSERT INTO orders (name, phone_number) VALUES ($1, $2) RETURNING *;`;
    const ordersStatusQuery = 'INSERT INTO pizzas_orders (pizza_id, order_id, quantity) VALUES ($1, $2, $3);';
    const findPizzaQuery = 'SELECT id FROM pizzas WHERE name = $1;';
    let orderMessage = 'New Order!\n';
    for (const item in req.body.cart) {
      orderMessage += `${req.body.cart[item]} x ${item}\n`
    }

    db.query(orderQuery, [name, phone])
      .then(data => {
        for (const item in req.body.cart) {
          db.query(findPizzaQuery, [item])
          .then(idData => {
            db.query(ordersStatusQuery, [idData.rows[0].id, data.rows[0].id, req.body.cart[item]])
            .then(insertData => res.json(insertData));
          })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    client.messages.create({
      body: orderMessage,
      to: `${toNumber}`,  // Text this number
      from: '+16502414473' // From a valid Twilio number
    })
      .then((message) => {
          // console.log("text sent");
          res.redirect("/status");
          // console.log(message.sid);
        console.log("text sent");
        // res.redirect("/status");
        console.log(message.sid);
      });
      res.send('ok')
  });


  return router;
};
