const { createProxyMiddleware } = require("http-proxy-middleware");

let restreamReq = function(proxyReq, req, res, options) {
  id = req.params.id;
  console.log(req.params.id);
  req.body.id = id;
  proxyReq.method = "POST";
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
      console.log(body);
      output = JSON.parse(body);
      _write.call(res, JSON.stringify(output));
    } catch (err) {
      console.log(err);
    }
  };
};

//let proxyPath = "/rotaDois/:id";
let options = {
  target: "http://localhost:6666/proxy2/",
  ignorePath: true,
  onProxyReq: restreamReq,
  onProxyRes: restreamRes,
}
const apiProxy = createProxyMiddleware(options);

module.exports = apiProxy;
