import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleNewRoom = this.handleNewRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)});
    });
  }

  handleNewRoom(e) {
    this.setState({newRoomName: e.target.value});
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return};
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({newRoomName: ""});
  }

  render() {
    return (
      <div>
        <h1>Bloc Chat</h1>
        <form className="newRoomForm" onSubmit={this.createRoom}>
          <input type="text" value={this.state.newRoomName} placeholder="Enter room name" onChange={this.handleNewRoom} />
          <input type="submit" className="button" value="Add Room" />
        </form>

        <ul>
          {this.state.rooms.map((room, index) =>
            <div className="roomData" key={index} onClick={() => this.props.setActiveRoom(room)}>
            {room.name}</div>
          )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
