const express = require('express');
const app = express();
const Search = require('./search');
const fetch = require('node-fetch');

app.use(express.json());

app.get('/data', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(Search.data, null, 4));
});

app.get('/', (req, res) => {
  const search = Search();
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(search.autocomplete('your problem', 4), null, 4));
});

app.post('/', async (req, res) => {
  let list = [];
  let books = [];
  for(query of req.body.queries) {
    const search = Search();
    let results = search.autocomplete(query, req.body.k);
    results.forEach(reco => {
      delete reco.count;
      delete reco.index;
      delete reco.prefer;
      reco.query = query;
      books.push(reco.id); // create an array of book_ids; use this to generate an array of promises
    });
    list.push(results);
  }
  // console.log(books);
  
  const url = 'https://ie4djxzt8j.execute-api.eu-west-1.amazonaws.com/coding';
  let authors = await Promise.all( // use Promise.all to resolve the array of promises as one promise
    books.map(async id => {
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"book_id": id})
      });
      data = await res.json();
      return data.author // create an array of authors from book_ids
    })
  );
  // console.log(authors);

  // Put back author key into results
  let i=0;
  list = list.map(query => query.map(result => { // double map because result is a list of lists
    i++;
    return {
      ...result,
      author: authors[i-1]
    }
  }))

  res.header("Content-Type",'application/json');
  res.json(list);
});

app.listen(8000, () =>
  console.log('Server listening...')
);