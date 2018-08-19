const http = require('http');

const server = http.createServer((req, res)=>{
  res.end('This is my first response');
});

// 8081/GamerStore/
server.listen(process.env.PORT || 8081);
