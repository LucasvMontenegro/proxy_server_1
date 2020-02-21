const express = require("express");
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const userRoutes = require("./routers/user");
const proxyRoutes = require("./routers/proxy");
const restream = function(proxyReq, req, res, options) {
  if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
  }
}

const apiProxy = createProxyMiddleware('/proxy', {
  target: 'http://localhost:6666/user/',
  onProxyReq: restream,
  pathRewrite: {
    '^/proxy': '', // remove path
  }, 
});

const autentication = function(req, res, next) {
  console.log("1 autentication");
  next();
};

app.use(autentication);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/proxy", proxyRoutes);
app.use(apiProxy);                // with restreaming
// app.use('/proxy', createProxyMiddleware( { target: 'http://localhost:6666/user/', changeOrigin: true, pathRewrite: {
//   '^/proxy': '', // remove path
// }, }));

app.use("/user", userRoutes);

const port = 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
