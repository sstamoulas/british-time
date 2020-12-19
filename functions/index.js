//const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser');
const fileUpload = multer()
const app = express()

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive', 
  'https://www.googleapis.com/auth/drive.readonly', 
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let auth;

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content));
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    auth = oAuth2Client;
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      auth = oAuth2Client;
    });
  });
}

cloudinary.config({ 
  cloud_name: 'everest-logix', 
  api_key: '632927142658635', 
  api_secret: 'ONhcxrrnvRFOM9M88W1OmOxCNko' 
});

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// let corsOptions = {
//   origin: 'http://localhost:3001',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/image-upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    cloudinary.uploader.upload(req.file.path, { public_id: req.body.public_id, invalidate: true }, (error, result) => {
      fs.unlinkSync(req.file.path)
      return res.status(200).send(req.file)
    });
  })
})

app.post('/file-upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    const fileMetadata = {
      name: req.file.originalname, // file name that will be saved in google drive
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path), // Reading the file from our server
    };

    // Authenticating drive API
    const drive = google.drive({ version: 'v3', auth });

    // Uploading Single image to drive
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
      },
      async (err, file) => {
        if (err) {
          // Handle error
          console.error(err.msg);

          return res
            .status(400)
            .json({ errors: [{ msg: 'Server Error try again later' }] });
        } else {
          fs.unlinkSync(req.file.path)
          // if file upload success then return the unique google drive id
          // this must be saved to firebase under the course or lesson id
          res.status(200).json({
            fileID: file.data.id,
          });
        }
      }
    );
  })
});

// Route for downloading an image/file
app.delete('/file-delete/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const drive = google.drive({ version: 'v3', auth }); // Authenticating drive API

  // Deleting the image from Drive
  drive.files.delete({
    fileId,
  })
  .then(
    async function (response) {
      res.status(204).json({ status: 'success' });
    },
    function (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Deletion Failed for some reason' }] });
    }
  );
});

app.get('/file-download', (req, res) => {
  //https://drive.google.com/file/d/fileId/view?usp=sharing
  const drive = google.drive({version: 'v3', auth});
  const fileName = req.query.fileName;
  const fileId = req.query.fileId;
  const dest = fs.createWriteStream(`./${fileName}`);
  let progress = 0; // This will contain the download progress amount

  drive.files.get(
    {
      fileId, 
      alt: 'media'
    }, 
    {
      responseType: 'stream'
    },
    async (err, driveResponse) => {
      driveResponse.data
      .on('end', () => {
        console.log('Done');
        //const file = './test-file.jpg'; // file path from where node.js will send file to the requested user
        res.download(`${__dirname}/${fileName}`); // Set disposition and send it.
      })
      .on('error', err => {
        console.log('Error', err);
      })
      .on('data', (d) => {
        progress += d.length;
        if (process.stdout.isTTY) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Downloaded ${progress} bytes`);
        }
      })
      .pipe(dest);
    }
  );
});

app.get('/video-conference', (req, res) => {
  res.send("Hello from the video-conference")
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})

//exports.api = functions.https.onRequest(app)
