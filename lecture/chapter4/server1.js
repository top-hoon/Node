const http  = require('http');
const fs = require('fs').promises;
const num = require('os').cpus().length;    // 개수


http.createServer(async (req, res) => {
    try{
        res.writeHead(200, {'Content-type': 'text/html; charset = utf-8'});
        const data = await fs.readFile('./server2.html');
        console.log(num)
        res.end(data);
    } catch (error){
        console.error(err);
        res.writeHead(200,{'Content-type': 'text/plain; charset = utf-8'})
    }

})
    .listen(8080,()=>{
        console.log('8080포트로 연결대기중')
    })