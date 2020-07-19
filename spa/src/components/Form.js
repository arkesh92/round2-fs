import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: '', autocomplete: [], fetching: false, suggest: true};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({suggest: true});
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
          autocomplete: data[0],
          fetching: false
        });
      })
    }
    else {
      this.setState({autocomplete: []});
    }
  }

  handleClick(event) {
    let id = event.target.getAttribute('data-key');
    let selected = {...this.state.autocomplete[id]};
    // console.log(selected);
    this.props.handleSelect(selected);
    this.setState({
      query: event.target.textContent,
      autocomplete: [],
      suggest: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({query: ''});
    this.props.handleSubmit(event);
  }

  render() {
    let dropdown;
    if(this.state.fetching)
      dropdown = <ul className="dropdown"><li className="disabled">Loading...</li></ul>
    else if(this.state.autocomplete.length)
      dropdown = <ul className="dropdown">
        {this.state.autocomplete.map((item, i) =>
          <li key={item.id} data-key={i} onClick={this.handleClick}>
            {item.title}
          </li>
        )}
      </ul>;
    else if(this.state.query.length >= 3 && this.state.suggest)
      dropdown = <ul className="dropdown"><li className="disabled">No suggestions</li></ul>;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Enter query" value={this.state.query} onChange={this.handleChange} />
        <input type="submit" value="Add" />
        {dropdown}
      </form>
    );
  }
}

export default Form;
