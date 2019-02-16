import {Router} from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.send('OK: true')
});

routes.get('/api/products', (req, res) => {
    res.send('All products')
});

routes.get('/api/products/:id', (req, res, next) => {
    res.send(`Product with id=${req.params.id}`);
    next();
});

routes.get('/api/products/:id/reviews', (req, res, next) => {
    res.send(`Reviews for product with id=${req.params.id}`);
    next();
});

routes.post('/api/products', (req, res) => {
    res.send(JSON.stringify(req.query));
});

routes.get('/api/users', (req, res, next) => {
    res.send("All users");
    next();
});

export default routes;