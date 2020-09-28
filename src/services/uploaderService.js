import stream from 'stream';
import { google } from 'googleapis';
import axios from 'axios';
import clientCredentials from '../config/.google/credentials.json';

/**
 * Create and store .ppt or .pptx file in Google Drive as a Google Slide
 * @param {string} originalName File name.
 * @param {string} mimeType File ime type.
 * @param {string} path storage path of the file.
 * @returns {Object} slide created data
 */
export const createGoogleDriveSlide = async (originalName, mimeType, accessToken, buffer) => {
  try {
    const { client_id, client_secret, redirect_uris } = clientCredentials.web;

    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const drive = google.drive('v3');
    const fileMetaData = {
      name: originalName,
      mimeType: 'application/vnd.google-apps.presentation'
    };

    const media = {
      mimeType,
      body: bufferStream
    };

    const oAuth2Cient = new google.auth.OAuth2({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uris[0]
    });

    oAuth2Cient.setCredentials({
      access_token: accessToken
    });

    const uploadedFile = await drive.files.create({
      auth: oAuth2Cient,
      requestBody: {
        ...fileMetaData,
        type: 'anyone',
        writersCanShare: true
      },
      media
    });

    const { data, status, statusText } = uploadedFile;

    await drive.permissions.create({
      auth: oAuth2Cient,
      fileId: data.id,
      requestBody: {
        type: 'anyone',
        allowFileDiscovery: false,
        role: 'reader'
      },
      fields: 'id'
    });

    const url = await getSlideUrl(data.id, accessToken);

    return { url, data, status, statusText };
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Get EmbedLink of a slide
 * @param {string} fileId File ID.
 * @param {string} accessToken user access token.
 * @returns {Promise<string>} slide url
 */
const getSlideUrl = async (fileId, accessToken) => {
  try {
    const { data, status } = await axios({
      url: `https://www.googleapis.com/drive/v2/files/${fileId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (status === 200) return data.embedLink;

    return null;
  } catch (error) {
    console.log(error);
  }
};
