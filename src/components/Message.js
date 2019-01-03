import React, { Component } from 'react';
// import MessageList from './components/MessageList.js'

class Message extends Component {
  render() {
    return (
      <div className="container">
        <div className={this.props.message.read ? "row message read" : "row message unread"}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" />
              </div>
              <div className="col-xs-2">
                <i className="star fa fa-star-o"></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            <a href="#">
              {this.props.message.subject}
            </a>
          </div>
        </div>
      </div >

    );
  }
}

export default Message;
