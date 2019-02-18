import express from 'express';
import expressSession from 'express-session';
import routes from './routes/routes';
import passport from "./auth/auth-strategies";
import {parserCookie} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';
import {tokenCheck} from './middlewares/token-check';

const app = express();

app.use(queryParser);
app.use(parserCookie);
app.use(expressSession({secret: 'SECRET', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(tokenCheck);
app.use('/', routes);

export default app;