//const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser');
const fileUpload = multer()
const app = express()

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

app.post('/image-upload', (req, res, next) => {
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

app.get('/video-conference', (req, res) => {
  res.send("Hello from the video-conference")
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})

//exports.api = functions.https.onRequest(app)
