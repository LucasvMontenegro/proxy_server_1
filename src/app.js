const express = require("express");
const bodyParser = require("body-parser");
const rotaUmRoutes = require("./routers/proxyRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/rotaUm", rotaUmRoutes);

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
