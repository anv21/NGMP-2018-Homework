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
        consumerKey: "415838880427-1oh3en4togls15c7j7jr7fqikbtqcrhe.apps.googleusercontent.com",
        consumerSecret: "CASSG5Ko7-vkwZEvLXdjqVnQ",
        callbackURL: `http://localhost:8080/auth/google/callback`
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

passport.use(new Strategy((username, password, done) => {
    const foundUser = {
        login: user.name,
        password: user.password
    };
    if (foundUser) {
        done(null, foundUser);
    } else {
        done(null, false, {message: "User doesn't exist"});
    }
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

export default passport;