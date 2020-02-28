const { createProxyMiddleware } = require("http-proxy-middleware");

// Função que intercepta e reescreve a Request
let restreamReq = function(proxyReq, req, res, options) {
  if (req.body) {
    // Editar o req.body AQUI
    // proxyReq.method edita o verbo HTTP proxyReq.method = 'METODO ex 'POST''
  let bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

// Função que Capta e rescreve a Response
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
      // Alterar o body aqui através do output
      output = JSON.parse(body);
      output.message = "ALTERED";
      _write.call(res, JSON.stringify(output));
    } catch (err) {
      console.log(err);
    }
  };
};
// Define
let proxyPath = "/rotaUm";

// Define para qual rota encaminhas a Request
let options = {
  target: "http://localhost:6666/proxy2",
  onProxyReq: restreamReq,
  onProxyRes: restreamRes,
  pathRewrite: {
    // Reescreve o path do destino
    "^/rotaUm": "" // remove path
  }
};

const apiProxy = createProxyMiddleware(proxyPath, options);

module.exports = apiProxy;
