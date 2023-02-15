import "./index.scss";
import io from "socket.io-client";
import { useState } from "react";
import GridBoard from "../GridBoard";
import Close from "../icons/Close";

const socket = io.connect("http://localhost:8080");

function Room({ size, isLoginSystem, userInfors, changeState }) {
  const randomRoom = (Math.floor(Math.random() * 1000) + 1) 
  const [room, setRoom] = useState(randomRoom);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (randomRoom) => {
    if (userInfors.userName !== "" && randomRoom !== "") {
      console.log('join room idNode', userInfors.idNode)
      const data = {
        idNode: userInfors.idNode,
        id: userInfors.id,
        imgUrl: userInfors.imgUrl,
        room: randomRoom
      }
      socket.emit("join_room", data);
      setShowChat(true);
    }
  };

  return (
    <div className={isLoginSystem ? "Room" : "Room none"}>
      {!showChat ? (
        <div className="rooms">
          <div className="create-room" onClick={()=>{joinRoom(room)}}>
            Create Room
          </div>
          <div className="join-room">
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(+event.target.value);
              }}
            />
            <div className="join-room-title" onClick={()=>{joinRoom(room)}}>Join Room</div>
          </div>
          <div className="close" onClick={()=>{changeState('menu')}}><Close/></div>
        </div>
      ) : (
        <GridBoard
          size={size}
          socket={socket}
          username={userInfors.userName}
          id= {userInfors.id}
          idNode= {userInfors.idNode}
          imgUrl= {userInfors.imgUrl}
          room={room}
          changeState={changeState}
        />
      )}
    </div>
  );
}

export default Room;
