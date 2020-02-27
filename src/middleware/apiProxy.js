const { createProxyMiddleware } = require("http-proxy-middleware");

// let restreamReq;
// let restreamRes;
// let proxyPath = "";
// let proxyTarget = "http://example.com/path";
// let options = {
//   target: proxyTarget,
//   onProxyReq: restreamReq,
//   onProxyRes: restreamRes,
//   pathRewrite: {
//     "": "" // remove path
//   }
// };

function proxy(event) {
  let proxyPath = event.proxyPath;
  let options = event.options;

  const apiProxy = createProxyMiddleware(proxyPath, options);
}

module.exports = proxy;
