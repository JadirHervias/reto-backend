import fs from 'fs';
import stream from 'stream';
import { google } from 'googleapis';
import GoogleClientFactory from '../services/GoogleClientFactory.js';

/**
 * Create and store .ppt or .pptx file in Google Drive as a Google Slide
 * @param {string} originalName File name.
 * @param {string} mimeType File ime type.
 * @param {string} path storage path of the file.
 * @returns {GaxiosResponse<drive_v3.Schema$File>}
 */
export const createGoogleDriveSlide = async (originalName, mimeType, path, buffer) => {
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
    // body: fs.createReadStream(path)
  };

  const uploadedFile = await drive.files.create({
    // TODO: use firebase with JWT
    auth: new GoogleClientFactory().getClient(),
    resource: fileMetaData,
    media
  });

  // TODO: Make it works
  // removeFileFromStorage(path);

  return uploadedFile;
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
