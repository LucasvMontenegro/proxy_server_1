const express = require("express");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const userRoutes = require("./routers/user");
const proxyRoutes = require("./routers/proxy");

const app = express();

const restream = function(proxyReq, req, res, options) {
  if (req.body) {
    if(req.body.method) proxyReq.method = req.body.method;
    let bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};
// const resp = (proxyRes, res ) => {
// if (res.body){

// }
// }

const apiProxy = createProxyMiddleware("/proxy", {
  target: "http://localhost:6666/proxy2",
  onProxyReq: restream,
  //onProxyRes: resp,
  pathRewrite: {
    "^/proxy": "" // remove path
  }
});

const autentication = function(req, res, next) {
  console.log("autentication middleware");
  next();
};

app.use(autentication);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/proxy", proxyRoutes);
app.use(apiProxy); // with restreaming

app.use("/user", userRoutes);

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
