import glob from 'glob';

/**
 * Register all the API endpoints
 * @param {Router} router Express router
 */
export function registerRoutes(router) {
  const routes = glob.sync(__dirname + '/**/*.routes.*');
  routes.map(route => {
    register(route, router);
  });
}

/**
 * Register all the API endpoints
 * @param {string} routePath Path of the route
 * @param {Router} router Express router
 */
function register(routePath, router) {
  const route = require(routePath);
  route.register(router);
}
