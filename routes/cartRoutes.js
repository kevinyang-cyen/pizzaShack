// *
//  * All routes for Orders are defined here
//  * Since this file is loaded in server.js into api/orders,
//  *   these routes are mounted onto /orders
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
<<<<<<< HEAD
    req.params;
=======
    console.log(res)
    console.log('almost there bro')
>>>>>>> cartRoutes
  });
  return router;
};
