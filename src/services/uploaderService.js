import fs from 'fs';
import stream from 'stream';
import { google } from 'googleapis';
import credentials from '../config/.google/credentials.json';
// import GoogleClientFactory from '../services/GoogleClientFactory.js';
// import { drive, oAuth2Client } from '../index';

/**
 * Create and store .ppt or .pptx file in Google Drive as a Google Slide
 * @param {string} originalName File name.
 * @param {string} mimeType File ime type.
 * @param {string} path storage path of the file.
 * @returns {GaxiosResponse<drive_v3.Schema$File>}
 */
export const createGoogleDriveSlide = async (originalName, mimeType, userCredentials, buffer) => {
  try {
    const { access_token, refresh_token, id_token, token_type, expires_in } = userCredentials;

    console.log('filename: ' + originalName);

    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const drive = google.drive('v3');
    const fileMetaData = {
      name: originalName,
      mimeType: 'application/vnd.google-apps.presentation'
    };

    const media = {
      // application/vnd.ms-powerpoint
      // application/vnd.openxmlformats-officedocument.presentationml.presentation
      mimeType,
      body: bufferStream
    };

    const oAuth2Cient = new google.auth.OAuth2({
      clientId: credentials.web.client_id,
      clientSecret: credentials.web.client_secret,
      redirectUri: credentials.web.redirect_uris[0]
    });

    // googleapis.com
    // oauth2.googleapis.com
    // developers.google.com/oauthplayground
    // const hostUrl = 'https://www.oauth2.googleapis.com';

    // hostUrl +=
    //   '?code=' +
    //   verificationCode +
    //   '&client_id=' +
    //   credentials.web.client_id +
    //   '&client_secret=' +
    //   credentials.web.client_secret +
    //   '&redirect_uri=' +
    //   credentials.web.redirect_uris[0] +
    //   '&grant_type=authorization_code';

    // const authUrl = oAuth2Cient.generateAuthUrl({
    //   access_type: 'offline', // (gets refresh_token)
    //   scope: [
    //     'https://www.googleapis.com/auth/drive',
    //     'https://www.googleapis.com/auth/drive.readonly',
    //     'https://www.googleapis.com/auth/drive.metadata.readonly',
    //     'https://www.googleapis.com/auth/drive.file',
    //     'https://www.googleapis.com/auth/userinfo.profile'
    //   ],
    //   response_type: "",
    //   prompt: "none"
    // });

    // oAuth2Cient.request({

    // })

    // const token = await oAuth2Cient.getToken(verificationCode);

    // console.log('ACCESS TOKENNNNNNN!!!\n');
    // console.log(token);

    oAuth2Cient.setCredentials({
      access_token
    });

    const uploadedFile = await drive.files.create({
      // TODO: use firebase with JWT
      // auth: new GoogleClientFactory().getClient(),
      // auth: new google.auth.OAuth2({
      //   clientId: credentials.web.client_id,
      //   clientSecret: credentials.web.client_secret
      // }).setCredentials({
      //   access_token,
      //   refresh_token,
      //   id_token,
      //   token_type,
      //   expiry_date: expires_in
      // }),
      auth: oAuth2Cient,
      resource: fileMetaData,
      media
    });

    return uploadedFile;
  } catch (error) {
    console.log('EEEEEEEEEEERRORRRRRRR!');
    console.log(error.message);
  }
};

/**
 * Remove the file from the temporary storage once it is saved in Google Drive
 * @param {string} path Temporary path.
 * @returns {void}
 */
const removeFileFromStorage = path => {
  fs.unlink(serverPath.resolve('src', path), error => {
    if (error) throw error;
    else console.log(`${path} was deleted`);
  });
};
