const express = require("express");
const router = express.Router();
const apiProxy = require("../middleware/rotaUmProxy");

router
  .route("/")
  .get((req, res, next) => {
    next();
  })
  .post((req, res, next) => {
    next();
  }, apiProxy)

module.exports = router;
