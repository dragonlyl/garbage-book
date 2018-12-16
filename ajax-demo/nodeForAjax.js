var http = require("http");
const fs = require('fs')

var server = http.createServer();

server.on("request", function (request, response) {
    // console.log("我接收了客户端的请求，路径是" + request.url);
    var url = request.url;
    if (url === "/index") {
        response.write("hello node.js");
    } else if (url === "/test") {
        fs.readFile('./ajax.html', (err, data) => {
            if (err) {
                return response.end('404 no found')
            }
            return response.end(data);
        })
    } else {
        response.write("<h1>404 page not found</h1>");
    }
});
server.listen("1122", '127.0.0.1', function () {
    console.log("服务器启动成功，可以通关过 http://localhost:1122/ 来访问")
});


