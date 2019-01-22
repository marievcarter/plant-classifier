require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

// needed to download image to local folder.
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

// needed to run python scripts
const shell = require('shelljs');

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use(formData.parse());

app.get('/wake-up', (req, res) => res.send('👌'));

app.get('/run-scripts', (req, res) => {
  const results = shell.exec(
    '/Users/mariecarter/Documents/GHP/GH_Senior/stackathon/react-image-upload/server/test_model.sh'
  );
  res.json(results);
});

let url = '';
app.get('/image-download', (req, res) => {
  const path = Path.resolve(__dirname, 'images', 'img.jpg');
  const writer = Fs.createWriteStream(path);
  Axios({
    method: 'GET',
    url,
    responseType: 'stream',
  })
    .then(function(response) {
      response.data.pipe(writer);
      return writer;
    })
    .then(function(writ) {
      const log = new Promise((resolve, reject) => {
        writ.on('finish', resolve);
        writ.on('error', reject);
      });
      console.log(log);
      res.sendStatus(201);
    })
    .catch(err => res.status(400).json(err));
});

app.post('/image-upload', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises)
    .then(results => {
      url = results[0].secure_url;
      res.json(results);
    })
    .catch(err => res.status(400).json(err));
});

app.listen(process.env.PORT || 8080, () => console.log('👍'));
