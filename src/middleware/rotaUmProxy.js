const { createProxyMiddleware } = require("http-proxy-middleware");

let restreamReq = function(proxyReq, req, res, options) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

let restreamRes = function(proxyRes, req, res) {
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
      //console.log("Antes", output)
      output.message = 'resposta alterada';
      //console.log("Depois", output)
      _write.call(res, JSON.stringify(output));
    } catch (err) {
      console.log(err);
    }
  };
};

//let proxyPath = "/rotaUm";
let options = {
  target: "http://localhost:6666/proxy2/",
  ignorePath: true,
  onProxyReq: restreamReq,
  onProxyRes: restreamRes,
  // pathRewrite: {
  //   "^/rotaUm": "" // remove path
  // }
};

const apiProxy = createProxyMiddleware(options);

module.exports = apiProxy;
