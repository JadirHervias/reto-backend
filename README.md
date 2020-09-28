# reto-backend

Jadir Hervias

### SETUP

- Visit the following URL and get your credentials.json file:
  <https://developers.google.com/drive/api/v3/quickstart/nodejs>

```bash
# Copy the credentials.json into the .google directory in order to use the Google Drive API

# Copy the env variables from the example
cat .env.example > .env

# Install dependencies
npm i

# Run in development mode
npm run dev

# Run in production mode
npm run start
```

### ALLOW GOOGLE DRIVE ACCESS AND GENERATE THE USER ACCESS TOKEN

- Go to the next URL:

  - <https://developers.google.com/oauthplayground/>

- Step 1: Select the following scopes:

  - https://www.googleapis.com/auth/drive
  - https://www.googleapis.com/auth/drive.readonly
  - https://www.googleapis.com/auth/drive.metadata.readonly
  - https://www.googleapis.com/auth/drive.file
  - https://www.googleapis.com/auth/userinfo.profile

    Click on **"Authorize APIs"**

- Step 2: Exchange authorization code for tokens

  You got the access_token and refresh_token

### ENDPOINTS:

- API endpoint in default port 3000

**Upload a .ppt or .pptx file**

- **Method:** POST
- **Authorization Header:** Bearer {access_token}
- **Form-data:**

  **key/name:** slide

  **value:** .ppt or .pptx file

- <http://localhost:3000/api/v1/uploader>

#### Success example:

```json
{
  "data": {
    "url": "https://docs.google.com/presentation/d/1z18xkeC-nFCHR0twpt4znTfHPsDWmgkFZMCrzQKh9AE/preview?ouid=110848733261583573509",
    "data": {
      "kind": "drive#file",
      "id": "1z18xkeC-nFCHR0twpt4znTfHPsDWmgkFZMCrzQKh9AE",
      "name": "slidePPT9999",
      "mimeType": "application/vnd.google-apps.presentation"
    }
  },
  "message": "File uploaded succesfully",
  "status": 200
}
```
