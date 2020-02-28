const express = require("express");
const router = express.Router();
const apiProxy = require("../middleware/rotaDoisProxy");

router
.route("/:id")
.get((req, res, next) => {  
  next();
}, apiProxy)

module.exports = router;
