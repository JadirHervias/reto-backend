import glob from 'glob';
import path from 'path';

export function registerRoutes(router) {
  const routes = glob.sync(path.resolve() + '/**/*.routes.*');
  routes.map(route => {
    register(route, router);
  });
}

function register(routeFilePath, router) {
  const route = require(routeFilePath);
  route.register(router);
}
