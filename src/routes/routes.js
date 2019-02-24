import {Router} from 'express';
import fakeUsers from "../../data/testDataHm5";
import {getJwToken, errorResponse} from "../utils/utils";
import passport from "../auth/auth-strategies";

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

routes.post('/auth', (req, res) => {
    res.contentType('application/json');
    const user = fakeUsers.find(user => user.password === req.body.password);
    let response;
    if (user) {
        res.status(200);
        const token = getJwToken(user.name);
        res.status(200).send({
            code: "200",
            message: "OK",
            data: {
                user: {
                    username: user.name,
                    email: user.email
                }
            },
            token
        });
    } else {
        errorResponse(res)
    }
});

routes.post('/login', passport.authenticate("local", {
    failureRedirect: "/"
}), (req, res) => {
    res.json(req.user);
});

routes.get('/auth/facebook', passport.authenticate("facebook"));

routes.get('/auth/facebook/callback', passport.authenticate("facebook", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

routes.get('/auth/twitter', passport.authenticate("twitter"));

routes.get('/auth/twitter/callback', passport.authenticate("twitter", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

routes.get('/auth/google', passport.authenticate("google", {scope: ['https://www.googleapis.com/auth/plus.login']}));

routes.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: "/api/products",
    failureRedirect: "/login"
}));

export default routes;