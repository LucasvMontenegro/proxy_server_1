const express = require("express");
const bodyParser = require("body-parser");
const rotaUmRoutes = require("./routers/rotaUmRoute");
const rotaDoisRoutes = require("./routers/rotaDoisRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/rotaUm", rotaUmRoutes);
app.use("/rotaDois", rotaDoisRoutes)

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
