const functions = require('firebase-functions');
const express = require('express')
const path = require('path');
const app = express()

// serve static assets normally
app.use(express.static(path.join(__dirname, './../client/build')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './../client/build', 'index.html'));
});

exports.api = functions.https.onRequest(app)
