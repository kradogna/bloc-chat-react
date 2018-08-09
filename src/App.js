import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import { RoomList } from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
