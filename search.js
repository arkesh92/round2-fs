const Search = () => {
  // declaring class variables
  let results = []; // array to store autocomplete suggestions
  let visited = {}; // hashmap to store summaries added to autocomplete

  const findMatches = (query, markVisit = false) => {
    let summaries = [];
    Search.data.summaries.forEach((item) => {
      if(visited[item.id]) // check hashmap if summary already included in autocomplete
        return;
      let id = item.id;
      let summary = item.summary;
      let index = summary.toLowerCase().indexOf(query.toLowerCase()); // ignore case while comparing
      if(index != -1) { // if query found in summary
        if(markVisit)
          visited[id] = true; // add entry in hashmap
        let count = summary.toLowerCase().split(query).length - 1; // frequency of query in summary
        // store frequency, position and boolean - if complete query found - for sorting later
        summaries.push({id, title: Search.data.titles[id], summary, count, index, prefer: markVisit});
      }
    });
    return summaries;
  }
  
  const autocomplete = (query, k) => {
    // 1. Push summaries containing complete phrases directly into results
    results = results.concat(findMatches(query, true)); // true when searching for complete phrase
    

    // 2. Check if more suggestions to be found, possible if query contains more than 1 word
    let len = results.length;
    if(len < k && query.indexOf(' ') != -1) {
      let subqueries = query.split(' '); // split phrase into words
      let matches = [];

      // a. Find all summaries matching of all possible words
      subqueries.forEach((subquery) => {
        let summaries = findMatches(subquery); // do not mark as visited, since all matches are counted independently
        matches.push({subquery, count: summaries.length, summaries});
      });

      // b. Find which word has the lowest number of matches, i.e. highest relevancy
      matches.sort((a, b) => a.count - b.count);

      // c. Add as many suggestions as required for the most relevant words
      for(match of matches) {
        len = len + match.count;
        results = results.concat(match.summaries);
        if(len >= k)
          break;
      }
    }

    // 3. Sort based on keys stored earlier and slice on top k results
    results.sort((a, b) => b.prefer - a.prefer || b.count - a.count || a.index - b.index)
    results.length = Math.min(results.length, k);
    
    return results;
  }

  // Using the 'return' keyword to control what gets exposed
  return {
    autocomplete
  }
}

// non-function property initialized outside the class
Search.data = require('./data');
// console.log(Search.data);

// const search1 = Search();
// console.log(search1.autocomplete('our behavior', 7));
// const search2 = Search();
// console.log(search2.autocomplete('achieve', 4));
// const search3 = Search();
// console.log(search3.autocomplete('your problem', 4));

module.exports = Search;