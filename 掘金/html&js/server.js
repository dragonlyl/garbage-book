const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const hostname = 'localhost';
const port = 8071;
const newUrl = require('url');
http.createServer((req,res)=> {
    // newUrl 是解析
    var parseUrl = newUrl.parse(req.url,true);
    // qs.parse 是解析?后面的参数 总感觉没啥必要  因为上面解析url已经传了第二个参数(是否解析query)
    // const parseQuery = qs.parse(parseUrl.query);
    
    let url = parseUrl.pathname;
    if(url === '/') {
        console.log(parseUrl.query.name,'url');
        res.writeHead(200, {
            "Content-Type": "text/html;charset=UTF-8"
        });
        fs.readFile('./用法.html',(err,data)=> {
            if(err) {
                return res.end('404');
            }
            return res.end(data);
        })
    }
}).listen(port,hostname,()=> {
    console.log('服务启动')
})