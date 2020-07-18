import React from 'react';
import Form from './Form';
import List from './List';

function App() {
  return (
    <div className="app">
      <header className="header">
        Your personal book library
      </header>
      <Form />
      <List />
    </div>
  );
}

export default App;
