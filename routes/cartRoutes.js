// *
//  * All routes for Orders are defined here
//  * Since this file is loaded in server.js into api/orders,
//  *   these routes are mounted onto /orders
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();
const cart = require("../server.js");

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(res.body)
    console.log(req.params)
    console.log('almost there bro')
    templateVars = {cart}
    res.render("order_page_template", templateVars)
  });
  return router;
};
