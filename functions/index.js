const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const Busboy = require('busboy')
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser');
const app = express()

app.use(cors());

app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.raw({ limit: '1gb' })); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
})); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive', 
  'https://www.googleapis.com/auth/drive.readonly', 
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
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

app.post('/image-upload', async (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  const fileWrites = [];
  let filePath;
  let publicId;

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    publicId = val;
  });

  // This code will process each file uploaded.
  busboy.on('file', async (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    filePath = path.join(tmpdir, filename);

    const writeStream = fs.createWriteStream(filePath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });

      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', () => {
    Promise.all(fileWrites).then(async () => {
      cloudinary.uploader.upload(
        filePath, 
        { 
          public_id: publicId, 
          invalidate: true 
        }, 
        (error, result) => {
          fs.unlinkSync(filePath);
          return res.status(200).json({
            public_id: publicId,
          });
        }
      );
    })
  });

  busboy.end(req.rawBody);
})

app.post('/file-upload', async (req, res) => {
  req.setTimeout(0);
  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  const fileWrites = [];
  let fileName;
  let filePath;
  let mimeType;
  let publicId;

  // This code will process each non-file field in the form.
  busboy.on('field', (val) => {
    publicId = val;
  });

  // This code will process each file uploaded.
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    fileName = filename;
    mimeType = mimetype;

    filePath = path.join(tmpdir, filename);

    const writeStream = fs.createWriteStream(filePath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
          writeStream.end();
      });

      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', () => {
    Promise.all(fileWrites).then(async () => {
      const fileMetadata = {
        name: fileName, // file name that will be saved in google drive
      };

      const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath), // Reading the file from our server
      };

      const permission = {
        role: 'reader', 
        type: 'anyone',
      };

      // Authenticating drive API
      const drive = google.drive({ version: 'v3', auth });

      // Uploading Single file to drive
      await drive.files.create(
        {
          resource: fileMetadata,
          media: media,
        },
        async (err, file) => {
          if (err) {
            // Handle error
            console.error(err.msg);

            return await res
              .status(400)
              .json({ errors: [{ msg: 'Server Error try again later' }] });
          } else {
            await drive.permissions.create({
              resource: permission,
              fileId: file.data.id,
              fields: 'id',
            }, async function (err, data) {
              console.log(data)
              if (err) {
                // Handle error...
                return await res
                  .status(400)
                  .json({ errors: [{ msg: 'Server Error try again later' }] });
              } else {
                console.log('Permission ID: ', res.id)
                fs.unlinkSync(filePath)
                // if file upload success then return the unique google drive id
                // this must be saved to firebase under the course or lesson id
                await res.status(200).json({
                  fileId: file.data.id,
                  fileName: fileName,
                });
              }
            });
          }
        }
      );
    })
  });

  busboy.end(req.rawBody);
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

app.post('/video-upload', (req, res) => {
  req.setTimeout(0);
  const youtube = google.youtube({version: 'v3', auth});

  // youtube.channels.list({
  //   auth: auth,
  //   part: 'snippet,contentDetails,statistics',
  //   id: 'UCJOno6HR7QiNfgR8C_lfeFg'
  // }, function(err, response) {
  //   if (err) {
  //     console.log('The API returned an error: ' + err);
  //     return;
  //   }
  //   var channels = response.data.items;
  //   if (channels.length == 0) {
  //     console.log('No channel found.');
  //   } else {
  //     console.log(channels)
  //     // console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
  //     //             'it has %s views.',
  //     //             channels[0].id,
  //     //             channels[0].snippet.title,
  //     //             channels[0].statistics.viewCount);
  //   }
  // });

  // youtube.channels.list(
  // {
  //   "part": [
  //     "snippet,contentDetails,statistics"
  //   ],
  //   "id": [
  //     "UCJOno6HR7QiNfgR8C_lfeFg"
  //   ]
  // },
  youtube.videos.insert(
    {
      auth: auth,
      part: 'snippet, status',
      resource: {
        // Video title and description
        snippet: {
          title: 'My title',
          description: 'My description'
        },
        // I set to private for tests
        status: {
          privacyStatus: 'unlisted'
        }
      },

      // Create the readable stream to upload the video
      media: {
        body: fs.createReadStream('./images/test.webm') // Change here to your real video
      }
    },
    async (err, file) => {
      if (err) {
        // Handle error
        console.log(err)

        return await res
          .status(400)
          .json({ errors: [{ msg: 'Server Error try again later' }] });
      } else {
        //fs.unlinkSync(req.file.path)
        // if file upload success then return the unique google drive id
        // this must be saved to firebase under the course or lesson id

        console.log('channel details:', file);

        console.log('https://www.youtube.com/watch?v=' + file.data.id);
        await res.status(200).json({
          fileId: file.data.id,
          fileName: '',
        });
      }
    }
  );
});

app.get('/video-conference', (req, res) => {
  res.send(`Hello from the video-conference gcloudName: ${process.env.GCLOUD_PROJECT} ${process.env.ENV}`)
})

exports.api = functions.https.onRequest(app)
