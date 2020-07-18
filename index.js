const express = require('express');
const app = express();
const Search = require('./search');

app.use(express.json());

app.get('/data', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(Search.data, null, 4));
});

app.listen(8000, () =>
  console.log('Server listening...')
);