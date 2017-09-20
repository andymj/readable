import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  state = {
    posts: null
  }
  componentDidMount() {
    fetch("http://localhost:3001/posts", { 
      method: 'GET', 
      headers: { Authorization: "whatever-you-want" },
      credentials: 'include'
    })
      .then(response => {
        this.setState({
          posts: response
        })
        console.log(response);
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
