import dotenv from 'dotenv';
import credentials from './.google/credentials.json';
import firebase from './.firebase/firebase.json';

dotenv.config();
export default {
  dev: process.env.NODE_ENV === 'development',
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  google: credentials,
  firebase
};
