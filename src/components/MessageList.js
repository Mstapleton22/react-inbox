import React, { Component } from 'react';
import Message from './Message.js'
// import App from "./App.js"

class MessageList extends Component {


  //   let getMessages = () => this.props.messages.map(messages, id) => {
  //   return getMessages
  // }

  render() {
    return (
      <div className="container">
        <Message></Message>
        {/* <div>
          {this.props.messages.map((item, idx) => {
            return (<Message
              key={idx}
              item={item.messages.subject}
            />)
          })
          } */}
        {/* {this.props.messages ? this.message : "there are no messages"} */}
        {/* <div>
            {this.props.messages ? this.message : "there are no messages"}
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default MessageList;