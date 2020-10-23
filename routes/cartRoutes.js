// *
//  * All routes for Orders are defined here
//  * Since this file is loaded in server.js into api/orders,
//  *   these routes are mounted onto /orders
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();
const cartHelper = require("../helperFunctions/cartHelper.js")

module.exports = (db) => {
  /**
   * 2. We want this route to only update data and send back the "new cart"
   */
  router.post("/", (req, res) => {
    const formData = req.body;
    const quantity = formData.quantity;
    const pizzaName = formData.pizzaName;

    // pizzaName is our key for the cart
    cart[pizzaName] = quantity;
    res.json(cart);
  });


  return router;
};
