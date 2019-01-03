import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import Message from './components/Message.js'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      messages = []
    }
  }

  fetchMessages = () => {
     return fetch('http://localhost:8082/api/messages')
  }







  render() {
    return (
      <div className="container">
        <Toolbar></Toolbar>
        <Message></Message>
      </div>
    );
  }
}

export default App;
