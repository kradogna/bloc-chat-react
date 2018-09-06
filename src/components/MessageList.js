import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: {
        username: "",
        content: "",
        roomId: "",
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      }
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  render() {
    return (
      <div>
        <div className="roomName">{this.props.activeRoom.name}</div>
        <ul id="messageList">
          {this.state.messages.filter(message =>
            message.roomId == this.props.activeRoom.key).map((message, index) =>
            <li className="messageItems" key={index}>
              <div className="username">{message.username}</div>
              <div className="sentAt">{message.sentAt}</div>
              <div className="messageLine2">{message.content}</div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default MessageList;
