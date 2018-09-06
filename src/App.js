import React, { Component } from 'react';
import './reset-css/reset.css';
import './stylesheet.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCFGxdKhFyvHx9EAB_IQQuSejx9KEUQCu4",
  authDomain: "bloc-chat-react-b6ddb.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-b6ddb.firebaseio.com",
  projectId: "bloc-chat-react-b6ddb",
  storageBucket: "bloc-chat-react-b6ddb.appspot.com",
  messagingSenderId: "557531276027"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};

    this.setActiveRoom = this.setActiveRoom.bind(this);
}

setActiveRoom(room) {
  this.setState({activeRoom: room});
}

  render() {
    return (
      <div className="flex-container">
        <div id="sidebar">
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
          />
        </div>

        <div id="main">
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
