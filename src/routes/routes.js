import {Router} from 'express';
import {getJwToken, errorResponse} from "../utils/utils";
import passport from "../auth/auth-strategies";
import {User, Product, Review, City} from '../models';

const routes = Router();

routes.get('/', (req, res) => {
    res.send('OK: true')
});

routes.get('/api/products', (req, res) => {
    Product.find((err, result) => {
        res.send(result);
    });
});

routes.get('/api/products/:id', (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        res.send(product ? product : `Product by id: ${req.params.id} is not found`);
    });
});

routes.get('/api/users', (req, res, next) => {
    User.find(((err, result) => {
        res.send(result);
    }));
});

routes.get('/api/city', (req, res) => {
    City.count().exec((err, count) => {
        const random = Math.floor(Math.random() * count);
        City.findOne().skip(random).exec((err, result) => {
            res.send(result);
        });
    });
});

routes.get('/api/cities', (req, res) => {
    City.find((err, result) => {
        res.send(result);
    });
});

routes.post('/login', passport.authenticate("local", {
    failureRedirect: "/"
}), (req, res) => {
    res.json(req.user);
});

routes.post('/api/products', (req, res) => {
    const newProduct = new Product({
        name: req.body.name
    });
    newProduct.save((err, result) => {
        res.send(err ? err : result);
    });
});

routes.post('/auth', (req, res) => {
    res.contentType('application/json');
    User.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
        if (user) {
            res.status(200);
            const token = getJwToken(user.name);
            res.status(200).send({
                code: "200",
                message: "OK",
                data: {
                    user
                },
                token
            });
        } else {
            errorResponse(res)
        }
    });
});

routes.post('/api/cities', (req, res) => {
    const newCity = new City(req.body);
    newCity.save((err, result) => {
        res.send(result);
    });
});

routes.delete('/api/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "Success");
    });
});

routes.delete('/api/products/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "Success");
    });
});

routes.delete('/api/cities/:id', (req, res) => {
    City.deleteOne({ _id: req.params.id }, function (err) {
        res.send(err ? err : "OK");
    });
});

routes.put('/api/cities/:id', (req, res) => {
    City.findByIdAndUpdate(req.params.id, req.body, {upsert: true}, (err, result) => {
        res.send(err ? err : result);
    });
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
