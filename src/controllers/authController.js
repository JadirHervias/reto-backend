import { authorizeClient } from '../services/authService';
import GoogleClientFactory from '../services/GoogleClientFactory';
/**
 * Controller to login via Google OAuth2
 * @param {Express.Request} req Endpoint request object
 * @param {Express.Response} res Endpoint response
 * @param {import('express').NextFunction} next The callback that handles the error
 */
const loginWithGoogle = (req, res, next) => {
  try {
    const tokenResponse = authorizeClient();

    // TODO: response with the token ID
    res.status(200).json({
      data: tokenResponse,
      message: 'OK'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to verify the login credentials with the Google API
 * @param {Express.Request} req Endpoint request object
 * @param {Express.Response} res Endpoint response
 */
const googleVerification = (req, res) => {
  const code = req.query.code;
  if (code) {
    // get access token
    const oAuthClient2 = new GoogleClientFactory().getClient();
    oAuthClient2.getToken(code, (error, token) => {
      if (error) {
        console.log('Error in authentication');
        console.log(error.message);
      } else {
        console.log('Successfully authenticated');
        console.log('TOKEN:');
        console.log(token);
        oAuthClient2.setCredentials(token);
        res.status(200).json({
          data: token,
          message: 'Successfully authenticated'
        });
      }
    });
  }
};

export { loginWithGoogle, googleVerification };
