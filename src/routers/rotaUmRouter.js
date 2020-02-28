const express = require("express");
const router = express.Router();
const apiProxy = require("../middleware/rotaUmProxy");

router
  .route("/")
  .post((req, res, next) => {
    next();
  }, apiProxy)

module.exports = router;
