import React, { Component } from 'react';
// import Message from './Message.js'


class Toolbar extends Component {

  render() {

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default">
            <i className="fa fa-minus-square-o"></i>
          </button>

          <button className="btn btn-default">
            Mark As Read
          </button>

          <button className="btn btn-default">
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