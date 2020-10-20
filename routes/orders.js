/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, inProgressOrder) => {
  router.get("/", (req, res) => {

    // res.render("home_page", {pizzas:[{
    //     'pepperoni': {
    //       name: 'pepperoni',
    //       cost: 34.50,
    //       time: "15 minutes",
    //       toppings: 'Handmade bread dough, Marinara Sauce, Four different types of artisanal cheese, hand-sliced pepperoni, garlic butter brushed crust'
    //     }
    //   }]})
    db.query(`SELECT * FROM pizzas;`)
      .then(data => {
        const pizzas = data.rows;
        const templateVars = { pizzas, inProgressOrder }
        res.render("home_page", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
