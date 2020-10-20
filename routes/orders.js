/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { orderChecker, qtyChecker } = require('./order-checker');
const cart = require('./cart');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM pizzas;`)
      .then(data => {
        const pizzas = data.rows;
        const status = orderChecker(cart);
        const quantity = qtyChecker(cart);
        const templateVars = { pizzas, status, quantity };
        res.render("home_page", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  router.post("/", (req, res) => {
    const pizza = Object.keys(req.body).toString()
    const quantity = req.body[pizza];
    cart[pizza] = quantity;
    res.redirect("/")
    
  });
  return router;
};
