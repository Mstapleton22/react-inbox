import React, { Component } from 'react';
import Message from './Message.js'


class Toolbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addLabels: []
    }
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a class="btn btn-danger">
            <i class="fa fa-plus"></i>
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

          <select className="form-control label-select" onChange={this.props.updateLabels}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>

    );
  }
}

export default Toolbar;