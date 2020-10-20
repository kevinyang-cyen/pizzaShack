/*
 * All routes for Status are defined here
 * Since this file is loaded in server.js into api/status,
 *   these routes are mounted onto /status
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
      SELECT * FROM pizzas;
    `)
      .then(data => {
        const pizzas = data.rows;
        const templateVars = { pizzas }
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
