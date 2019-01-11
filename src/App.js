import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
// import Message from './components/Message.js'
import ComposeMessage from './components/ComposeMessage.js'
import Flexbox from 'flexbox-react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      compose: false,
      subject: '',
      body: '',
      errorMessage: false
    }
  }

  fetchMessages = () => {
    return fetch("http://localhost:8082/api/messages")
      .then(response => response.json())
      .then(responseJSON => {
        let addSelected = responseJSON.map(message => {
          if (!message.selected) {
            message.selected = false
            message.opened = false
            return message
          } else {
            message.opened = false
            return message
          }
        })
        this.setState({ messages: addSelected })
        return addSelected
      })
  }

  componentDidMount() {
    this.fetchMessages()
      .catch(error => {
        this.setState({
          errorMessage: true
        })
      })
  }

  sendMessage = () => {
    return fetch("http://localhost:8082/api/messages", {
      method: 'POST',
      body: JSON.stringify({
        subject: this.state.subject,
        body: this.state.body
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          messages: [...this.state.messages, responseJSON]
        })
      })
  }


  composeMessage = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }


  updates = async (id, command, prop, value) => {
    // console.log('im here')
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

  dropDownCompose = () => {
    // console.log('compose')
    this.setState({
      compose: !this.state.compose
    })
  }

  messageRead = (id) => {
    const readMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = true
        message.opened = !message.opened
      }
      return message
    })
    this.setState({
      messages: readMessages
    })
    // console.log(this.updates([id], "read", "read", true))
    this.updates([id], "read", "read", true)
  }

  markAsRead = (id) => {
    const ids = []
    const markRead = this.state.messages.map(message => {
      if (message.selected && !message.read)
        message.read = true
      ids.push(message.id)
      return message
    })
    this.setState({
      messages: markRead
    })
    this.updates(ids, "read", "read", true)
  }

  markAsUnread = (id) => {
    const ids = []
    const markUnread = this.state.messages.map(message => {
      if (message.selected && message.read)
        message.read = false
      ids.push(message.id)
      return message
    })
    this.setState({
      messages: markUnread
    })
    this.updates(ids, "read", "read", true)
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
    this.updates([id], "read", "read", true)
  }

  selectAllMessage = () => {
    const selectAllMess = this.state.messages.length === this.state.messages.filter(sel => sel.selected).length
    const selectAll = this.state.messages.map(message => {
      if (selectAllMess) {
        message.selected = false
      } else if (message.selected === false) {
        message.selected = true
      }
      return message
    })
    this.setState({
      messages: selectAll
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

  deleteMessage = () => {
    const ids = []
    this.state.messages.map(message => {
      if (message.selected) {
        ids.push(message.id)
      }
    })
    const deleteMessage = this.state.messages.filter(message => !message.selected)
    this.setState({
      messages: deleteMessage
    })
    this.updates(ids, "delete")
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container" >
        <Toolbar
          messages={this.state.messages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}
          selectAllMessage={this.selectAllMessage}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          dropDownCompose={this.dropDownCompose}
          compose={this.state.compose}>
        </Toolbar>
        {this.state.compose ? <ComposeMessage sendMessage={this.sendMessage} composeMessage={this.composeMessage} /> : null}
        < MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          selectMessage={this.selectMessage}
          starMessage={this.starMessage}
        >
        </MessageList >
        <div className="error">
          <h3>
            {this.state.errorMessage
              ? "Unable to load inbox"
              : this.state.messages.length === 0
                ? "Inbox is Empty"
                : ""}
          </h3>
        </div>
      </div >
    );
  }
}

export default App;