import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
// import Message from './components/Message.js'
// import ComposeMessage from './components/ComposeMessage.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  fetchMessages = () => {
    return fetch("http://localhost:8082/api/messages")
      .then(response => response.json())
      .then(responseJSON => {
        let addSelected = responseJSON.map(message => {
          if (!message.selected) {
            message.selected = false
            return message
          } else {
            return message
          }
        })
        this.setState({ messages: responseJSON })
        return responseJSON
      })
  }

  componentDidMount() {
    this.fetchMessages()
      .catch(error => console.error(error))
  }
  // updateLabels = (event) => {
  //   this.setState({
  //     addLabels: [...this.state.addLabels, event.target.value]
  //   })
  // }

  updates = async (id, command, key, value) => {
    await fetch("http://localhost:8082/api/messages", {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [id],
        "command": command,
        [key]: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  messageRead = (id) => {
    const readMessages = this.state.messages.map(message => {
      if (message.id === id)
        message.read = !message.read
      return message
    })
    this.setState({
      messages: readMessages
    })
    // console.log(this.updates(id, "read", "read", true))
    this.updates(id, "read", "read", true)
  }

  selectMessage = (id) => {
    const select = this.state.messages.map(message => {
      if (message.id === id)
        message.selected = !message.selected
      return message
    })
    this.setState({
      messages: select
    })
  }

  starMessage = (id) => {
    const star = this.state.messages.map(message => {
      if (message.id === id)
        message.starred = !message.starred
      return message
    })
    this.setState({
      messages: star
    })
    this.updates(id, "star", "starred", true)
  }

  addLabel = (event) => {
    const label = this.state.messages.map(message => {
      // console.log(this.state.messages)
      if (message.selected === true)
        message.labels = [...message.labels, event.target.value]
      // console.log(event.target)
      return message
    })
    this.setState({
      messages: label
    })
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container" >
        <Toolbar
          addLabel={this.addLabel}>
        </Toolbar>
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          selectMessage={this.selectMessage}
          starMessage={this.starMessage}
        >
        </MessageList>

        {/* <ComposeMessage></ComposeMessage> */}
      </div >
    );
  }
}

export default App;
