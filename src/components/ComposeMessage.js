import React, { Component } from 'react';


class ComposeMessage extends Component {

  render() {
    return (
      <div className="container">
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label for="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.props.composeMessage} ></input>
            </div>
          </div>
          <div className="form-group">
            <label for="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control" onChange={this.props.composeMessage}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary" onClick={this.props.sendMessage}></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ComposeMessage;