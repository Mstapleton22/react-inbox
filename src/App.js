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

  updates = async (id, command, prop, value) => {
    await fetch("http://localhost:8082/api/messages", {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": id,
        "command": command,
        [prop]: value
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
        message.read = true
      return message
    })
    this.setState({
      messages: readMessages
    })
    // console.log(this.updates(id, "read", "read", true))
    this.updates([id], "read", "read", true)
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
    this.updates([id], "star", "starred")
  }

  // addLabelId = (id) => {
  //   const labelId = this.state.messages.filter((message) => {
  //     return message
  //   }).map(message => message.id)
  //   return labelId
  // }
  addLabel = (event) => {
    const ids = []
    const label = this.state.messages.map((message) => {
      if (message.selected === true) {
        if (!message.labels.includes(event.target.value)) {
          message.labels = [...message.labels, event.target.value]
          ids.push(message.id)
        }
      }
      return message
    })
    this.setState({
      messages: label
    })
    console.log(event.target.value)
    this.updates(ids, "addLabel", "label", event.target.value)
  }


  removeLabel = (event) => {
    const ids = []
    const remLabel = this.state.messages.map(message => {
      if (message.selected === true) {
        if (message.labels.includes(event.target.value)) {
          const indexLabel = message.labels.indexOf(event.target.value)
          message.labels.splice(indexLabel, 1)
          ids.push(message.id)
        }
      }
      return message
    })
    this.setState({
      messages: remLabel
    })
    this.updates(ids, "removeLabel", "label", event.target.value)
  }
  //think about what messages you want to keep
  deleteMessage = (event) => {
    const deleteMessage = this.state.messages.filter(message => {
      if (message.selected === true) {
        delete (message.selected)
      } else if (message.selected !== true)
        return message
    })
    this.setState({
      messages: deleteMessage
    })
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container" >
        <Toolbar
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}>
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