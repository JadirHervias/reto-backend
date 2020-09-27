import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import config from './config/index.js';
import { registerRoutes } from './routes/index.js';
import { logErrors, wrapErrors } from './utils/middlewares/errorHandler';
import notFoundHandler from './utils/middlewares/notFoundHandler';

const app = express();
app.use(helmet());

// app.use(bodyParser.json());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

app.use(helmet.frameguard({ action: 'deny' }));

app.use(cors());
app.use(compression());
// Para habilitar CORS pre-flight
app.options('*', cors());

const router = express.Router();
app.use('/api/v1', router);
registerRoutes(router);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);

if (config.dev) {
  app.use(errorHandler());
}

app.listen(config.port, () => {
  console.log(`API running in http://localhost:${config.port}`);
});
