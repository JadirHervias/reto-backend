import boom from '@hapi/boom';

export default scopesValidationHandler = allowedScopes => {
  // Return the middleware
  return (req, res, next) => {
    // User has sufficient scopes
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }

    const arrayScopes = Object.values(req.user.scopes);

    // Get valid scopes
    const hasAccess = allowedScopes
      .map(allowedScope => arrayScopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scopes'));
    }
  };
};
