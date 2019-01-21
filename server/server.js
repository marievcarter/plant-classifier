require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

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

// async function downloadImage () {
//   const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
//   const path = Path.resolve(__dirname, 'images', 'code.jpg')
//   const writer = Fs.createWriteStream(path)

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   })

//   response.data.pipe(writer)

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   })
// }

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
    .then(writ => {
      const log = new Promise((resolve, reject) => {
        writ.on('finish', resolve);
        writ.on('error', reject);
      });
      console.log(log);
      res.sendStatus(201);
    })
    .catch(err => res.status(400).json(err));
  // console.log(response.data);
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
