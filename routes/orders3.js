/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cartHelper = require("../helperFunctions/cartHelper.js");

//twilio
let accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
const toNumber = process.env.TO_NUMBER;

let twilio = require('twilio');
// const { query } = require('express');
let client = new twilio(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    // // let reelPizza = window.userCart;
    // // let newPizzaInCart = cartHelper(reelPizza);


    // let pizzaInCart = cartHelper(cart);

    // // console.log("ORDER3", reelPizza, "reelPizza from session storage");
    // // console.log("ORDER3", newPizzaInCart, "new pizza, hardcoded");
    // // console.log(pizzaInCart, 'PIZZA in CART');
    // const query = `SELECT * from pizzas WHERE name = ANY(array[${pizzaInCart}]);`;
    // // console.log(query, "query");

    // ^^^everything above here we are 86ing for now
    // sends all pizzas to the page only displays those with a quantity
    const query = 'SELECT * from pizzas';



    db.query(query)
      .then(data => {
        const pizzas = data.rows;
        const templateVars = { pizzas };
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
    const ordersStatusQuery = 'INSERT INTO pizzas_orders (pizza_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
    const findPizzaQuery = 'SELECT id FROM pizzas WHERE name = $1;';
    let orderMessage = 'New Order!\n';
    for (const item in req.body.cart) {
      if (req.body.cart[item] != 0) {
        orderMessage += `${req.body.cart[item]} x ${item}\n`;
      }
    }

    db.query(orderQuery, [name, phone])
      .then(data => {
        orderMessage += `Order ID: ${data.rows[0].id}`;
        for (const item in req.body.cart) {
          db.query(findPizzaQuery, [item])
            .then(idData => {
              db.query(ordersStatusQuery, [idData.rows[0].id, data.rows[0].id, req.body.cart[item]]);
            })
            .catch(err => console.log(err));
        }
        return data.rows[0].id;
      })
      .then(order => {
        res.json({order});
        // res.redirect(`/order/${order}`);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      })

      .then(res => {
        client.messages.create({
          body: orderMessage,
          to: `${toNumber}`,  // Text this number
          from: '+16502414473' // From a valid Twilio number
        });
      });

  });

  router.get('/:id', (req, res) => {
    db.query(`
    SELECT orders.id, orders.time, pizzas.name as name, pizzas.ingredients as ingredients, price, image_url, orders.order_status, pizzas_orders.quantity
    FROM pizzas
    JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
    JOIN orders ON pizzas_orders.order_id = orders.id
    WHERE orders.id = $1;
    `, [req.params.id])
      .then(data => {
        const orderLists = data.rows;
        let subtotal = 0;
        for (let orderList of orderLists) {
          if(orderList.quantity) {
            subtotal += orderList.quantity*orderList.price;
          }
        }
        const templateVars = {orderLists, subtotal};
        console.log(templateVars);
        res.render("order_status", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id', (req, res) => {
    let body = req.body.Body.split(' ');
    let minutes = parseInt(body[1]);
    let order_id = parseInt(body[0]);
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
          WHERE orders.id = $1;
        `, [order_id])
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({error: e.message }));
    } else if (minutes) {
      db.query(`
        UPDATE orders
        SET order_status = 'Accepted', time = $1
        FROM (SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
          FROM pizzas
          JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
          JOIN orders ON pizzas_orders.order_id = orders.id) as subquery
          WHERE orders.id = $2;
        `, [minutes, order_id])
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({error: e.message }));

      setTimeout(function() {
        db.query(`SELECT phone_number FROM orders WHERE id = $1`, [order_id])
        .then(res => {
          client.messages.create({
            body: 'Your Order is Ready!',
            to: `${res.rows[0].phone_number}`,  // REPLACE WITH phoneNumber AFTER
            from: '+16502414473' // From a valid Twilio number
          })
            .then((message) => {
              console.log("text sent");
              console.log(message.sid);
            });
        })
        .catch(e => res.json(e));

        db.query(`
          UPDATE orders
          SET order_status = 'Completed', time = 0
          FROM (SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
            FROM pizzas
            JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
            JOIN orders ON pizzas_orders.order_id = orders.id) as subquery
          WHERE orders.id = $1;
          `, [order_id])
          .then(data => {
            res.json(data);
          })
          .catch(e => res.json({error: e.message }));
      }, minutes * 3 * 1000);

    }
  });

  return router;
};
