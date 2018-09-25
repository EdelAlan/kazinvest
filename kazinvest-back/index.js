const express = require('express');
const app = express();
const port = 5000;
const body_parser = require('body-parser');

app
  .use(body_parser())

  .get('/', (req, res) => {
    res.send('hello')
  })

  .listen(port, () => {
    console.log('listen ' + port);
  })
