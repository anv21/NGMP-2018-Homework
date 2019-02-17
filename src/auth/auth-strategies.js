import passport from "passport";
import localStrategy from "passport-local";
import facebookStrategy from "passport-facebook";
import googleStrategy from "passport-google-oauth";
import twitterStrategy from "passport-twitter";

const Strategy = localStrategy.Strategy;
const GoogleStrategy = googleStrategy.OAuthStrategy;
const TwitterStrategy = twitterStrategy.Strategy;

const user = {
    name: "Bob",
    password: "54321",
    id: "1"
};

passport.use(new facebookStrategy.Strategy({
        clientID: "1234",
        clientSecret: "sfacebook",
        callbackURL: "http://localhost:8080"
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, {
            profile
        });
    }
));

passport.use(new GoogleStrategy({
        consumerKey: "1234",
        consumerSecret: "sfacebook",
        callbackURL: "http://localhost:8080"
    },
    (token, tokenSecret, profile, done) => {
        done(null, {
            profile
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: "1234",
        consumerSecret: "sfacebook",
        callbackURL: "http://localhost:8080/"
    },
    (token, tokenSecret, profile, done) => {
        done(null, {
            profile
        });
    }
));

passport.use(new Strategy(
    (username, password, cb) => {
        if (username !== user.name) {
            return cb({
                error: "No such user"
            });
        }
        if (!user) {
            return cb(null, false);
        }
        if (user.password !== password) {
            return cb(null, false);
        }
        return cb(null, user);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

export default passport;