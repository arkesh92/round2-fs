import React from 'react';
import Form from './Form';
import List from './List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {library: [
      // {id: 0, title: 'HI', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis tincidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'},
      // {id: 2, title: 'Hello', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis id: 2, ncidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'},
      // {id: 3, title: 'Hello', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis tincidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'}
    ], selected: {}};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(Object.keys(this.state.selected).length) {
      let book = {...this.state.selected};
      let found = false;
      for(let item of this.state.library) {
        if (item.id == book.id)
          found = true;
      }
      if (!found) {
        this.setState({
          library: [...this.state.library, book],
          selected: {}
        });
      }
      else {
        alert("Book already in collection");
        this.setState({
          selected: {}
        });
      }
    }
  }

  handleSelect(book) {
    // console.log(book);
    this.setState({
      selected: book
    });
  }

  render() { 
    return (
      <div className="app">
        <header className="header">
          Your personal book library
        </header>
        <Form handleSelect={this.handleSelect} handleSubmit={this.handleSubmit} />
        <List library={this.state.library} />
      </div>
    );
  }
}

export default App;
