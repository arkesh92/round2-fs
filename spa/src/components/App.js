import React from 'react';
import Form from './Form';
import List from './List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {library: [
      {title: 'HI', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis tincidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'},
      {title: 'Hello', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis tincidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'},
      {title: 'Hello', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisl ex. Mauris semper eros vitae metus vehicula pulvinar. Duis tincidunt dignissim quam, sit amet faucibus risus eleifend tristique. Phasellus pulvinar sem laoreet tellus tempor pulvinar. Cras purus lacus, feugiat a mattis ut, feugiat sit amet leo. In non nisi sed nisl volutpat molestie ut in erat. Nulla facilisi. Mauris ac ante pulvinar, fermentum quam et, sodales massa. Aenean vel ullamcorper nisl. Donec dictum ex id fermentum elementum.", author: 'Arkesh Jaiswal'}
    ]};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() { 
    return (
      <div className="app">
        <header className="header">
          Your personal book library
        </header>
        <Form />
        <List library={this.state.library} />
      </div>
    );
  }
}

export default App;
