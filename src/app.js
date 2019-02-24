import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import passport from "./auth/auth-strategies";
import {parserCookie} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';

const app = express();

app.use(queryParser);
app.use(parserCookie);
app.use(bodyParser.json());
app.use(expressSession({secret: 'SECRET', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

export default app;