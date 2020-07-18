# TASK 1

- filename: `search.js`
- execution:
```
const search1 = Search();
console.log(search1.autocomplete('our behavior', 7));

const search2 = Search();
console.log(search2.autocomplete('achieve', 4));
```

# TASK 2

- filename: `index.js`
- endpoint: `http://localhost:8000` or `https://fs.arkesh.repl.co`
- body:
```
{
    "queries": ["our behavior", "your problem"],
    "k": 4
}
```