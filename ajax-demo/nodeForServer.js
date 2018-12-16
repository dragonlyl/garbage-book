const http = require('http');
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8071;
const newUrl = require('url')

http.createServer(function (req, res) {
    var parseUrl = newUrl.parse(req.url, true);
    console.log("请求路径" + req.url);
    let url = parseUrl.pathname
    if (url === "/") {
        fs.readFile("./views/test.html", (err, data) => {
            if (err) {
                return res.end("404 no found");
            }
            return res.end(data);
        });
    } if (url === "/test") {
        fs.readFile("./views/txt.txt", (err, data) => {
            if (err) {
                return res.end("404 no found");
            }
            // res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:1122");
            res.end(data);
        });
    } if (url === "/jsonp") {
        // res.setHeader('Content-Type','application/json');
        res.setHeader("Content-Type", 'application/javascript');
        var a = {
            name: 'jack',
            age: 23
        }
        let sendJson = JSON.stringify(a)
        let { callback } = parseUrl.query
        res.end(`${callback}(${sendJson})`)
        // res.end(`foo(${a})`)
        res.end(`foo({"name":"jack"})`)
    } else if (url.indexOf("/public/") >= 0 || url.indexOf("/favicon.ico") >= 0) {
        fs.readFile("." + url, (err, data) => {
            if (err) {
                return res.end("404");
            }
            // res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
            // console.log(parseUrl.query,'query')
            res.end(data);
        });
    }
}).listen(port, hostname, () => {
    console.log(`启动了服务,http://${hostname}:${port}`);
});