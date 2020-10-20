/*
 * All routes for Status are defined here
 * Since this file is loaded in server.js into api/status,
 *   these routes are mounted onto /status
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/status", (req, res) => {
    db.query(`
    SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
    FROM pizzas
    JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
    JOIN orders ON pizzas_orders.order_id = orders.id
    WHERE orders.id = 2;
    `)
      .then(data => {
        const orderList = data.rows;
        const templateVars = { orderList }
        res.render("order_status", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


