import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messages: [],
      message: {
        username: "",
        content: "",
        roomId: "",
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      }
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.checkRoomName = this.checkRoomName.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(new Date(message.sentAt));
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  handleNewMessage(e) {
    this.setState({newMessage: e.target.value});
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessage) {return};
    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({newMessage: ""});
  }

  checkRoomName() {
    if (!this.props.activeRoom.name) {
      return "Choose chat room from menu";
    }
    else {
      return "Room Name: " + (this.props.activeRoom.name);
    }
  }

  render() {
    return (
      <div>
        <div className="roomName">{this.checkRoomName()}</div>
        <ul id="messageList">
          {this.state.messages.filter(message =>
            message.roomId == this.props.activeRoom.key).map((message, index) =>
            <li className="messageItems" key={index}>
              <div className="username">{message.username}</div>

              <Moment element="span" format="MM/DD/YY hh:mm A" className="sentAt">
                {message.sentAt}
              </Moment>
              <div className="content">{message.content}</div>
            </li>
          )}
        </ul>

        <form onSubmit={this.createMessage}>
          <div className="newMessageForm">
            <input type="text" className="newMessage" value={this.state.newMessage} placeholder="Enter message" onChange={this.handleNewMessage} />
            <input type="submit" className="messageBtn" value="send" />
          </div>
        </form>
      </div>
    );
  }
}

export default MessageList;
