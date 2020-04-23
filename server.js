const http = require("http");
const URL = require("url");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});
const allowPostPath = [
  "/liveness/check_liveness",
  "/liveness/check_silent_liveness",
  "/hackness/selfie_hack_detect",
  "/liveness/liveness_image"
];
const REMOTE_SERVER = "http://cloudapi.linkface.cn";
const API_ID = "6bfd35b5c52f46bfaeceb3fda5e82516";
const API_SECRET = "b8244e5f778845e3a9e92e46769639ae";

proxy.on("proxyReq", function(proxyReq, req, res) {
  const uri = URL.parse(proxyReq.path);
  const path = `${uri.pathname}?api_id=${API_ID}&api_secret=${API_SECRET}`;
  if (
    proxyReq.method === "GET" ||
    (proxyReq.method === "POST" && allowPostPath.indexOf(uri.pathname) !== -1)
  ) {
    proxyReq.path = path;
  }
});

var server = http
  .createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    proxy.web(req, res, { target: REMOTE_SERVER });
  })
  .listen(80, "0.0.0.0");
