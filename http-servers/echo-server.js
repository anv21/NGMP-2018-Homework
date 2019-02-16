const http = require('http');
const port = 8083;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    req.pipe(res);
});

server.listen(port, () => {
    console.log(`Server is up and running on localhost:${port}.`);
});