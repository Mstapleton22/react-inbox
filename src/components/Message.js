import React, { Component } from 'react';
// import MessageList from './components/MessageList.js'

class Message extends Component {

  constructor(props) {
    super(props)
    this.state = {
      read: false,
      selected: false,
      starred: false,
      labels: []
    }
  }

  messageRead() {
    this.setState({
      read: this.props.message.read,
    })
  }

  messageSelect() {
    this.setState({
      selected: this.props.message.selected
    })
  }

  onClickMessage = (event) => {
    this.setState({
      read: true
    })
  }

  selectMessage = (event) => {
    this.setState({
      selected: this.state.selected ? false : true
    })
  }

  starMessage = (event) => {
    this.setState({
      starred: this.state.starred ? false : true
    })
  }

  messageStarDefault() {
    this.setState({
      starred: this.props.message.starred
    })
  }


  componentDidMount() {
    this.messageRead()
    this.messageSelect()
    this.messageStarDefault()
  }

  render() {

    const classNameStyle = () => {
      let readClass = this.state.read ? "row message read" : "row message unread"
      let selectClass = this.state.selected ? "selected" : ""
      let styleClass = selectClass === "" ? readClass : readClass + " " + selectClass
      console.log(styleClass)
      return styleClass
    }

    return (
      <div className="container">
        <div className={classNameStyle()}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={this.state.selected === true ? true : false} onChange={this.selectMessage} />
              </div>
              <div className="col-xs-2">
                <i className={this.state.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.starMessage}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.props.message.labels.map(label => <span className="label label-warning">{label}</span>)}
            <a href="#" onClick={this.onClickMessage}>
              {this.props.message.subject}
            </a>
          </div>
        </div>
      </div >

    );
  }
}

export default Message;
