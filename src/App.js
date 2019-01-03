import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import Message from './components/Message.js'
// import ComposeMessage from './components/ComposeMessage.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  fetchMessages = () => {
    return fetch("http://localhost:8082/api/messages")
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ messages: responseJSON })
        return responseJSON
      })
  }
  
  componentDidMount() {
    // console.log(this.fetchMessages())
    this.fetchMessages()
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="container">
        <Toolbar></Toolbar>
        <MessageList messages={this.state.messages}></MessageList>
        {/* <ComposeMessage></ComposeMessage> */}
      </div>
    );
  }
}

export default App;
