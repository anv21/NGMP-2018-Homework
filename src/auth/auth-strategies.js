import passport from "passport";
import localStrategy from "passport-local";
import facebookStrategy from "passport-facebook";
import googleStrategy from "passport-google-oauth";
import twitterStrategy from "passport-twitter";
import Sequelize from 'sequelize';
import {User} from '../models';
import {sequelize} from '../database/connect';

const user = User(sequelize, Sequelize);

const Strategy = localStrategy.Strategy;
const GoogleStrategy = googleStrategy.OAuth2Strategy;
const TwitterStrategy = twitterStrategy.Strategy;

passport.use(new Strategy((username, password, done) => {
    user.findOrCreate({where: {email: req.body.email, password: req.body.password}}).then((foundUser, created) => {
        if (foundUser) {
            done(null, foundUser);
        } else {
            done(null, false, {message: "User with entered login and password doesn't exists"});
        }
    });
}));


passport.use(new facebookStrategy.Strategy({
        clientID: "1762838263816191",
        clientSecret: "224dec3c68bb1242b5cbfd6492fca6d9",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
    },
    (token, tokenSecret, profile, done) => {
        done(null, {
            profile
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: "415838880427-1oh3en4togls15c7j7jr7fqikbtqcrhe",
        clientSecret: "CASSG5Ko7-vkwZEvLXdjqVnQ",
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    (token, tokenSecret, profile, done) => {
        done(null, {
            profile
        });
    }
));

passport.use(new TwitterStrategy({
    consumerKey: "ey06nuOpFXPP9RHIyhxzEGJtA",
    consumerSecret: "gRqGPjLtS45nK4xWRukWYIfEhP0jgXndBcMSLSTf1XHZBh3FWs",
    callbackURL: "http://localhost:8080/auth/twitter/callback"
}, (token, tokenSecret, profile, done) => {
    done(null, profile)
}));

// passport.use(new Strategy((username, password, done) => {
//     const foundUser = {
//         login: user.name,
//         password: user.password
//     };
//     if (foundUser) {
//         done(null, foundUser);
//     } else {
//         done(null, false, {message: "User doesn't exist"});
//     }
// }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default passport;