import {Router} from 'express';
import users from "../../data/testDataHm5";
import {getJwToken, errorResponse} from "../utils/utils";
import passport from "../auth/auth-strategies";
import checkToken from "../middlewares/token-check";

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

routes.post("/auth", (req, res) => {
    const {name, password} = req.body;
    const user = users.find(user => user.name === name);
    res.setHeader("Content-Type", "application/json");

    if (user && user.password === password) {
        const token = getJwToken();
        res.status(200).send({
            code: 200,
            message: "OK",
            data: {
                user: {
                    email: user.email,
                    username: name
                },
                token
            }
        });
    } else {
        errorResponse(res);
    }
});

routes.get("/auth/facebook", passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

routes.get("/auth/google", passport.authenticate("google", {
    scope: "https://www.google.com/m8/feeds"
}));

routes.get("/auth/twitter", passport.authenticate("twitter"));

routes.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth"
}), (req, res) => {
    res.send(req.user);
});

export default routes;