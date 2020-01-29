const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlShortener = require('node-url-shortener');
const db = require('./models/index.js');
const exphbs = require('express-handlebars');



app.get('/', function(req, res) {
  db.Url.findAll({order: [['createdAt', 'DESC']], limit: 5})
  .then(urlObjs => {
    res.render('index', {
      urlObjs: urlObjs
    });
  });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

app.post('/url', function(req, res) {
  const url = req.body.url

  urlShortener.short(url, function(err, shortUrl) {
    db.Url.findOrCreate({where: {url: url, shortUrl: shortUrl}})
    .then(([urlObj, created]) => {
      res.send(shortUrl)
    });
  });
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 

app.listen(port, () => {
  console.log(`url-shortenet listeming on port ${port}`);
});
