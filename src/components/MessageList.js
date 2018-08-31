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
        <h1>{this.props.activeRoom.name}</h1>
        {this.state.messages.filter(message =>
          message.roomId == this.props.activeRoom.key).map((message, index) =>
          <ul><li key={index}>{message.username} <br></br> {message.content} <br></br> {message.sentAt}</li></ul>
        )}
      </div>
    );
  }
}

export default MessageList;
