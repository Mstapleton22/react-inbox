import React, { Component } from 'react';
import Message from './Message.js'

class MessageList extends Component {

  render() {
    return (
      <div className="container">
        {this.props.messages ?
          this.props.messages.map(message => <Message message={message}></Message>) :
          <hi>Inbox is Empty!</hi>
        }
      </div>
    );
  }
}

export default MessageList;