import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';

const isEmpty = (str) => str.length === 0;

class App extends Component {
  state = {
    searchTerm: ''
  }
  onTextChange = (event) => {
    const value = event.target.value;

    this.setState({searchTerm: value});
  }

  onSearchClick = () => {
    console.log(this.state.searchTerm);

  }

  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

export default App;
