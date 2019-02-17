import express from 'express';
import routes from './routes/routes';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "./auth/auth-strategies";
import {parserCookie} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(queryParser);
app.use(parserCookie);
app.use('/', routes);
app.use(passport.initialize());
app.use(passport.session());

export default app;