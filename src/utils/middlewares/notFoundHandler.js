import boom from '@hapi/boom';

// Last middleware
const notFoundHandler = (req, res) => {
  // Case status 404
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
};

export default notFoundHandler;
