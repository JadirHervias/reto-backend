import boom from '@hapi/boom';

// Last middleware
const notFoundHandler = (req, res) => {
  // Case status 404
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  delete payload.statusCode;
  res.status(statusCode).json({ ...payload, status: statusCode });
};

export default notFoundHandler;
