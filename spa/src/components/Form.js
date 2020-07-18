import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: '', autocomplete: [], fetching: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let query = event.target.value;
    this.setState({query: query});
    if(query.length >= 3) {
      this.setState({fetching: true});
      fetch('http://localhost:8000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          queries: [query],
          k: 4
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data[0].length);
        this.setState({
          autocomplete: data[0].map(item => item.title),
          fetching: false
        });
      })
    }
    else {
      this.setState({autocomplete: []});
    }
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.query);
    event.preventDefault();
  }

  render() {
    let dropdown;
    if(this.state.fetching)
      dropdown = <ul className="dropdown"><li className="disabled">Loading...</li></ul>
    else if(this.state.autocomplete.length)
      dropdown = <ul className="dropdown">{this.state.autocomplete.map(item => <li>{item}</li>)}</ul>;
    else if(this.state.query.length >= 3)
      dropdown = <ul className="dropdown"><li className="disabled">No suggestions</li></ul>;
    return (
      <form>
        <input type="text" placeholder="Enter query" value={this.state.query} onChange={this.handleChange} />
        <input type="submit" value="Add" />
        {dropdown}
      </form>
    );
  }
}

export default Form;
