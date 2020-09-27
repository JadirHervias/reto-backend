import { google } from 'googleapis';
import config from '../config/index';

// TODO: Check if singleton is necesary
/**
 * Class to instanciate al google OAuth2 client
 * @class GoogleClientFactory
 */
export default class GoogleClientFactory {
  constructor() {
    if (GoogleClientFactory.instance instanceof GoogleClientFactory) {
      return GoogleClientFactory.instance;
    }
    this.client = null;
    GoogleClientFactory.instance = this;
  }

  /**
   * Get google client oauth if not instantiated
   */
  getClient() {
    if (!this.client) {
      console.log('NO existe cliente');
      const credentials = JSON.parse(JSON.stringify(config.google));
      const { client_id, client_secret, redirect_uris } = credentials.web;
      this.client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      // Object.freeze(this.client);
      // Object.freeze(this);
      return this.client;
    }
    console.log('YA existe cliente');
    return this.client;
  }
}
