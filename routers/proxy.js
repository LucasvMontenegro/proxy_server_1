const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const proxyValidator = [check("name").isString()];

const errorValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

router.route("/").get(proxyValidator, errorValidator, (req, res, next) => {
  console.log("/ Get PROXY");
  name = req.body.name;
  console.log(name);
  req.body.name += " sobrenome";
  //res.status(200).send("/ GET PROXY");

  next();
}).post((req, res, next)=>{
  res.sendStatus(404);
});

module.exports = router;
