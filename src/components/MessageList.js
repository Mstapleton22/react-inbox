import React, { Component } from 'react';
import Message from './Message.js'

class MessageList extends Component {

  render() {
    // console.log(this.props.messageRead)
    return (
      <div className="container">
        {this.props.messages ?
          this.props.messages.map(message =>
            <Message
              key={message.id}
              message={message}
              read={message.read}
              messageRead={this.props.messageRead}
              subject={message.subject}
              body={message.body}
              selected={message.selected}
              selectMessage={this.props.selectMessage}
              starred={message.starred}
              deleteMessage={this.props.deleteMessage}
              starMessage={this.props.starMessage}
            // labels={this.props.addLabels}
            >
            </Message>) :
          <hi>Inbox is Empty!</hi>
        }
      </div>
    );
  }
}

export default MessageList;