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
    this.deleteRoom = this.deleteRoom.bind(this);
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

  deleteRoom(rmRoom) {
    this.props.firebase.database().ref("rooms").child(rmRoom.key).remove();
    this.setState({rooms: this.state.rooms.filter(room => {
      return room.key !== rmRoom.key
    })});
  }

  render() {
    return (
      <div>
        <form className="newRoomForm" onSubmit={(e) => this.createRoom(e)}>
          <input type="text" value={this.state.newRoomName} placeholder="Enter room name" onChange={(e) => this.handleNewRoom(e)} />
          <input type="submit" className="roomBtn" value="Add Room" />
        </form>

        <ul>
          {this.state.rooms.map((room, index) =>
            <div key={index}>
              <span className="roomData" onClick={() => this.props.setActiveRoom(room)}>
                {room.name}</span>
                <span className="icon ion-md-trash" onClick={(e) => this.deleteRoom(room)}></span>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
