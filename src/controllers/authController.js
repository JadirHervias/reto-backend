// const UsersService = require('../services/users');
// const { admin } = require('../models/index');

// const usersService = new UsersService();

const login = (req, res, next) => {
  try {
    // use case
    res.status(200).json({
      data: 'data',
      message: 'OK'
    });
  } catch (error) {
    next(error);
  }
};

export { login };
