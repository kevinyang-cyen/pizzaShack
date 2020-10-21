// *
//  * All routes for Orders are defined here
//  * Since this file is loaded in server.js into api/orders,
//  *   these routes are mounted onto /orders
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();
const cart = require("./cart.js");
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
    // console.log(req.params)
    // cart[id]= req.params.quantity;
    // // re renders page after cart item updated
    // let pizzaInCart = cartHelper(cart);


    // console.log(pizzaInCart, 'PIZZA in CART');
    // const query = `SELECT * from pizzas WHERE name = ANY(array[${pizzaInCart}]);`
    // console.log(query, "query");
    // db.query(query)
    //   .then(data => {
    //     const pizzas = data.rows;
    //     const templateVars = { pizzas, cart };
    //     console.log(templateVars, 'template vars');
    //     res.render("order_page_template", templateVars);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });


  return router;
};
