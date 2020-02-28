const express = require("express");
const bodyParser = require("body-parser");
const rotaUmRouter = require("./routers/rotaUmRouter");
const rotaDoisRouter = require("./routers/rotaDoisRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/rotaUm", rotaUmRouter);
app.use("/rotaDois", rotaDoisRouter)

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
