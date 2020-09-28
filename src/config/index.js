import dotenv from 'dotenv';
import credentials from './.google/credentials.json';

dotenv.config();
export default {
  env: process.env.NODE_ENV || 'development',
  dev: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3000,
  google: credentials
};
