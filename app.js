const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlShortener = require('node-url-shortener');

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

app.post('/url', (req, res) => {
  const url = req.body.url;
  urlShortener.short(url, (err, shortenUrl) => {
    res.send(shortenUrl);
  });
});
 

app.listen(port, () => {
  console.log(`url-shortenet listeming on port ${port}`);
});
