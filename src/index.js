import express from 'express';
import helmet from 'helmet';
import config from './config/index.js';

const app = express();
app.use(helmet());

app.listen(config.port, () => {
  console.log(`API running in http://localhost:${config.port}`);
});
