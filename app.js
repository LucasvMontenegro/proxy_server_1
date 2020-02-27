const express = require("express");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const userRoutes = require("./routers/user");
const proxyRoutes = require("./routers/proxy");

const app = express();

const restreamReq = function(proxyReq, req, res, options) {
  if (req.body) {
    if (req.body.method) proxyReq.method = req.body.method;
    let bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};
const restreamRes = function(proxyRes, req, res) {
  var _write = res.write;
  var output;
  var body = "";
  proxyRes.on("data", function(data) {
    data = data.toString("utf-8");
    body += data;
  });
  res.write = function(data) {
    try {
      output = JSON.parse(body);
      //chama uma funcao 
      output.message = "ALTERED";
      _write.call(res, JSON.stringify(output));
    } catch (err) {
      console.log(err);
    }
  };
};
let proxyPath = "/proxy";
let proxyTarget = "http://localhost:6666/proxy2";

const apiProxy = createProxyMiddleware(proxyPath, {
  target: proxyTarget,
  onProxyReq: restreamReq,
  onProxyRes: restreamRes,
  pathRewrite: {
    "^/proxy": "" // remove path
  }
});

const autentication = function(req, res, next) {
  console.log("autentication middleware");
  next();
};
proxyMiddlewares = [proxyRoutes, apiProxy];

app.use(autentication);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/proxy/", proxyMiddlewares);
//app.use(apiProxy); // with restreaming

app.use("/user", userRoutes);

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
