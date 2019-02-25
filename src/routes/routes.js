import {Router} from 'express';
import Sequelize from 'sequelize';
import {getJwToken, errorResponse} from "../utils/utils";
import passport from "../auth/auth-strategies";
import {sequelize} from '../database/connect';
import {User, Product, Review} from '../models';


const routes = Router();
const product = Product(sequelize, Sequelize);
const user = User(sequelize, Sequelize);
const review = Review(sequelize, Sequelize);

review.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id'
});

review.belongsTo(product, {
    foreignKey: 'productId',
    targetKey: 'id'
});

routes.get('/', (req, res) => {
    res.send('OK: true')
});

routes.get('/api/products', (req, res) => {
    product.findAll().then(products => {
        res.send(products);
    });
});

routes.get('/api/products/:id', (req, res, next) => {
    product.findByPk(req.params.id).then(neededProduct => {
        res.send(neededProduct ? neededProduct : `Product by id: ${req.params.id} is not found`);
    });
});

routes.get('/api/products/:id/reviews', (req, res, next) => {
    review.findAll({where: {productId: req.params.id}}).then(reviews => {
        res.send(reviews ? reviews : `Reviews for product with id: ${req.params.id} is not found`);
    });
});

routes.post('/api/products/:id/review', (req, res) => {
    const oReview = {
        comment: req.body.comment,
        userId: req.body.userId,
        productId: req.params.id
    };
    review.create(oReview).then(review => {
        res.send(review);
    });
});

routes.post('/api/products', (req, res) => {
    product.create(req.body).then(createdProduct => {
        res.send(createdProduct);
    });
});

routes.get('/api/users', (req, res, next) => {
    user.findAll().then(users => {
        res.send(users);
    });
});

routes.post('/auth', (req, res) => {
    res.contentType('application/json');
    user.findOrCreate({where: {email: req.body.email, password: req.body.password}}).spread((user, created) => {
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