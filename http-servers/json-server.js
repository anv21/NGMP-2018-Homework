const http = require('http');
const port = 8082;

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' },
    ],
};

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/json' });
    res.end(JSON.stringify(product));
});

server.listen(port, () => {
    console.log(`Server is up and running on localhost:${port}.`);
});