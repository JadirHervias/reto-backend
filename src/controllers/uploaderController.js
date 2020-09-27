const uploadPpt = (req, res, next) => {
  try {
    // use case
    res.status(200).json({
      data: ['asasa', 'asasa', 'asasa'],
      message: 'OK'
    });
  } catch (error) {
    next(error);
  }
};

export { uploadPpt };
