import React from 'react';
// import MessageList from './components/MessageList.js'

const Message = (props) => {

  // messageRead() {
  //   this.setState({
  //     read: this.props.message.read,
  //   })
  // }

  // messageSelect() {
  //   this.setState({
  //     selected: this.props.message.selected
  //   })
  // }

  // messageLabel() {
  //   this.setState({
  //     labels: this.state.labels.concat(this.props.labels)
  //   })
  // }

  // onClickMessage = (event) => {
  //   this.setState({
  //     read: true
  //   })
  // }

  // selectMessage = (event) => {
  //   this.setState({
  //     selected: this.state.selected ? false : true
  //   })
  // }

  // starMessage = (event) => {
  //   this.setState({
  //     starred: this.state.starred ? false : true
  //   })
  // }

  // messageStarDefault() {
  //   this.setState({
  //     starred: this.props.message.starred
  //   })
  // }


  // componentDidMount() {
  //   // this.messageRead()
  //   // this.messageSelect()
  //   // this.messageStarDefault()
  // }

  const classNameStyle = () => {
    let readClass = props.read ? "row message read" : "row message unread"
    let selectClass = props.selected ? "selected" : ""
    let styleClass = selectClass === "" ? readClass : readClass + " " + selectClass
    return styleClass
  }

  const devLabel =
    props.message.labels.includes("dev")
      ? "label label-warning"
      : "hidden"

  const gschool =
    props.message.labels.includes("gschool")
      ? "label label-warning"
      : "hidden"

  const personal =
    props.message.labels.includes("personal")
      ? "label label-warning"
      : "hidden"

  return (

    < div className="container" >
      <div className={classNameStyle()}>
        <div className="col-xs-1">
          <div className="row" >
            <div className="col-xs-2" onChange={() => props.selectMessage(props.message.id)}>
              <input type="checkbox" checked={props.selected}/>
            </div>
            <div className="col-xs-2">
              <i className={props.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={() => props.starMessage(props.message.id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={() => props.messageRead(props.message.id)}>
          <span className={devLabel}>dev</span>
          <span className={gschool}>gschool</span>
          <span className={personal}>personal</span>
          {/* {props.message.labels.map(label => <span className="label label-warning">{label}</span>)} */}
          <a href="#">
            {props.subject}
          </a>
        </div>
      </div>
    </div >

  );
}

export default Message;
