const fs = require('fs');
const path = require('path');
const through = require('through2');
const http = require('http');

const port = 8081;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.createReadStream(path.resolve(__dirname, 'index.html'))
        .on('end', () => res.end())
        .pipe(through(processHtml))
        .pipe(res);

    function processHtml(chunk, encoding, next) {
        this.push(chunk
            .toString()
            .replace('{message}', 'Real message text'));
    }
});

server.listen(port, () => {
    console.log(`Server is up and running on localhost:${port}.`);
});