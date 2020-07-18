const Search = () => {
  // declaring class variables
  let results = []; // array to store autocomplete suggestions
  let visited = {}; // hashmap to store summaries added to autocomplete

  const findMatches = (query, markVisit = false) => {
    Search.data.summaries.forEach((item) => {
      if(visited[item.id]) // check hashmap if summary already included in autocomplete
        return;
      let id = item.id;
      let summary = item.summary;
      let index = summary.toLowerCase().indexOf(query.toLowerCase()); // ignore case while comparing
      if(index != -1) { // if query found in summary
        if(markVisit)
          visited[id] = true; // add entry in hashmap
        let count = summary.split(query).length - 1; // frequency of query in summary
        // store frequency, position and boolean - if complete query found - for sorting later
        results.push({id, title: Search.data.titles[id], summary, count, index, prefer: markVisit});
      }
    });
  }
  
  const autocomplete = (query, k) => {
    findMatches(query, true); // true when searching for complete phrase
    return visited;
  }

  // Using the 'return' keyword to control what gets exposed
  return {
    autocomplete
  }
}

// non-function property initialized outside the class
Search.data = require('./data');
// console.log(Search.data);

const search1 = Search();
console.log(search1.autocomplete('our behavior', 7));
const search2 = Search();
console.log(search2.autocomplete('achieve', 4));