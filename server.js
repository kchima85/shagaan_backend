const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('app listening on port 8080!');
});

app.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = app;
