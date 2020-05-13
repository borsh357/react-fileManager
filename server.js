'use strict';
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/files', function (req, res) {
  const data = fs.readFileSync('api/files.json', 'utf8');
  res.send(data);
});

app.post('/savefiles', function (req, res) {
  fs.writeFile('api/files.json', req.body, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  res.send('Данные добавлены');
});

app.listen(3001, (err) => {
  if (err) return console.log('something bad happened', err);
  console.log('server is listening 3001');
});
