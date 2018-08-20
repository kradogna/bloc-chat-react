import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleRoomChange(e) {
    this.setState({newRoomName: e.target.value});
  }

  createRoom(e) {
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({newRoomName: ""});
  }

  render() {
    const roomList = this.state.rooms.map((room) =>
      <li key={room.key}>{room.name}</li>
    );
    const createRoomForm = (
      <form onSubmit={this.createRoom}>
        <input type="text" placeholder="Enter room name" onChange={this.handleRoomChange} />
        <input type="submit" value="Create Room" />
      </form>
    );

    return(
      <div>
        <div>{createRoomForm}</div>
        <ul>{roomList}</ul>
      </div>
    );
  }
}

export default RoomList;
