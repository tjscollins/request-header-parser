var express = require('express');
var accepts = require('accepts')
var useragent = require('express-useragent');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(useragent.express());
app.get('/api/whoami', (req, res) => {
  var re = new RegExp(/\([;\s\w]+\)/);
  res.send(JSON.stringify({
    ip: req.ip,
    language: accepts(req).languages()[0],
    software: `${req
      .useragent
      .browser} ${re
      .exec(req.useragent.source)}`
  }));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
