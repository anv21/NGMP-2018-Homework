import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import routes from './routes/routes';
import passport from "./auth/auth-strategies";
import {parserCookie} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';

const app = express();
const swaggerDoc = yamljs.load('./swagger.yaml');

app.use(queryParser);
app.use(parserCookie);
app.use(bodyParser.json());
app.use(expressSession({secret: 'SECRET', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;