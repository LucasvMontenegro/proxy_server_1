const express = require("express");
const router = express.Router();
const proxy = require("../middleware/apiProxy.js");
//const apiProxy = require("../middleware/apiProxy.js");
const apiProxy = require("../middleware/middleware");
// let restreamRes = function(proxyRes, req, res) {
//   var _write = res.write;
//   var output;
//   var body = "";
//   proxyRes.on("data", function(data) {
//     data = data.toString("utf-8");
//     body += data;
//   });
//   res.write = function(data) {
//     try {
//       output = JSON.parse(body);
//       output.message = "ALTERED";
//       _write.call(res, JSON.stringify(output));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
// let restreamReq = function(proxyReq, req, res, options) {
//   if (req.body) {
//     if (req.body.method) proxyReq.method = req.body.method;
//     let bodyData = JSON.stringify(req.body);
//     proxyReq.setHeader("Content-Type", "application/json");
//     proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
//     proxyReq.write(bodyData);
//   }
// };

router
  .route("/")
  // .get((req, res, next) => {
  //   // let event = {
      
  //   //   proxyPath: "/rotaUm",
  //   //   options: {
  //   //     target: "http://localhost:6666/proxy2",
  //   //     onProxyReq: restreamReq,
  //   //     onProxyRes: restreamRes,
  //   //     pathRewrite: {
  //   //       "^/rotaUm": "" // remove path
  //   //     }
  //   //   }
  //   // };
  //   // proxy(event);
  //   // //next()
  // })
  .post((req, res, next) => {
    next();
  }, apiProxy);

module.exports = router;
