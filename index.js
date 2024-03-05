require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Database = require('./src/database');
const UrlModel = require('./src/models/url');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:shortUrl', function(req, res) {

  UrlModel.findOne({
    shortUrl: req.params.shortUrl,
  })
  .then((doc) => {
    res.writeHead(302, {
      'Location': doc.url
    });
    res.end();
  })
  .catch((err) => {
    console.error(err);
  });
  
});

app.post('/api/shorturl', function(req, res) {
  // check if req.body.url is http url
  if (!req.body.url.match(/^https?:\/\//)) {
    return res.json({ error: 'invalid url' });
  }

  UrlModel.find({
  })
  .then((doc) => {

    const url = new UrlModel({
      url: req.body.url,
      shortUrl: doc.length + 1,
    }).save()
    .then((doc) => {
  
      res.json({ 
        original_url: doc.url,
        short_url: doc.shortUrl,
       });
    })
    .catch((err) => {
      console.error(err);
    });
  })
  .catch((err) => {
    console.error(err);
  });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
