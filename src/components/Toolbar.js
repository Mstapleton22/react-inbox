import React, { Component } from 'react';
// import Message from './Message.js'


class Toolbar extends Component {

  render() {
    console.log(this.props.messages)
    let selectArray = this.props.messages.filter(message => message.selected).map(message => message.id)
    let selectAllCheck = ""
    if (selectArray.length === this.props.messages.length) {
      selectAllCheck = "check-"
    } else if (selectArray.length) {
      selectAllCheck = "minus-"
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={this.props.dropDownCompose}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={() => this.props.selectAllMessage(this.props.id)}>
            <i className={`fa fa-${selectAllCheck}square-o`}></i>
          </button>

          <button className="btn btn-default" onClick={() => this.props.markAsRead(this.props.id)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => this.props.markAsUnread(this.props.id)}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.props.addLabel}>
            <option disabled selected>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.props.removeLabel}>
            <option disabled selected>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={() => this.props.deleteMessage(this.props.id)} >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div >

    );
  }
}

export default Toolbar;