import "./index.scss";
import io from "socket.io-client";
import { useState } from "react";
import GridBoard from '../GridBoard'

const socket = io.connect("http://localhost:8080");

function Room({size, isLoginSystem}) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className={isLoginSystem ? "Room" : "Room none"}>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <GridBoard size={size} socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default Room;