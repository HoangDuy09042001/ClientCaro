import React, { useCallback, useEffect, useMemo, useState } from "react";
import X from "../icons/X";
import O from "../icons/O";
import Messenger from "../icons/Messenger";
import ScrollToBottom from "react-scroll-to-bottom";

import "./index.scss";
const GridBoard = ({ size, socket, username, room }) => {
  const [score_1] = useState(0);
  const [score_2] = useState(0);
  const [timer, setTimmer] = useState(20);
  const [turn, setTurn] = useState(true);
  const [contactZoomIn, setContactZoom] = useState(true);
  const [grid, setGrid] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  let initalMatrix = useMemo(() => {
    const initalMatrix = new Array(2);
    for (var i = 0; i < size; i++) {
      if (!initalMatrix[i]) initalMatrix[i] = [];
      for (var j = 0; j < size; j++) {
        initalMatrix[i][j] = false;
      }
    }
    return initalMatrix;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sendData = async (row, column) => {
    if (typeof row === "string" && typeof column === "string") {
      if (currentMessage !== "") {
        const messageData = {
          chat: true,
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    } else {
      const data = {
        grid: true,
        row,
        column,
        room: room,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", data);
      setGrid((list) => [...list, data]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      data.chat &&
        setMessageList((list) => {
          return [...list, data];
        });
      data.grid &&
        setGrid((list) => {
          return [...list, data];
        });
    });
  }, [socket]);
  
  const handleTimmer = useCallback(()=> {
    if(timer<20 && timer>=0) {
      setTimmer(20)

    }
    setInterval(() => {
      setTimmer((prev) => {
        if (prev > 0) return prev - 1;
        else if (prev === 0) {
          setTurn(!turn)
          return 20
        }
      });
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid])

  useEffect(() => {
    console.log(grid);
    grid.forEach((value) => {
      initalMatrix[value.row][value.column] = value.author;
    });
    if (grid.length >= 1) {
      if (grid[grid.length - 1].author !== username) {
        setTurn(true);
        handleTimmer()
      } else {
        setTurn(false);
        handleTimmer()
      }
      // setTimmer(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  const clickContact = () => {
    setContactZoom(!contactZoomIn);
  };
  useEffect(() => {
    handleTimmer();
    return handleTimmer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid-board">
      <div className="header-grid-board">
        <div className="hbg-item">You: {score_1}</div>
        <div className="hbg-item">Component: {score_2}</div>
      </div>
      <div className="info-turn">
        <div className="turn">
          {turn ? "This is your turn" : "This is component's turn"}
        </div>
        <div className="time">Time: {timer}</div>
      </div>
      <div className="body-grid-board">
        <div className="space-playing">
          {initalMatrix.map((item, index) => {
            return (
              <div className={"line"} key={index}>
                {item.map((ite, idx) => {
                  return (
                    <div
                      className={"sub-line"}
                      key={index + idx + ""}
                      onClick={() => {
                        sendData(index, idx);
                      }}
                    >
                      {ite === username ? (
                        <X height={30} width={30} />
                      ) : typeof ite === "string" ? (
                        <O height={30} width={30} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div
          className={
            !contactZoomIn ? "chat-box zoom-out" : "chat-box zoom-out none"
          }
        >
          <div className="title-chat-box">
            <div className="title">Chat box</div>
            <div className="icon-messenger-chat">
              <Messenger clickContact={clickContact} />
            </div>
          </div>
          <div className="chat-space">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent, index) => {
                return (
                  <div
                    className={
                      username === messageContent.author
                        ? "message you"
                        : "message other"
                    }
                    key={index}
                  >
                    <div className="mess-content">
                      <div className="message-meta">
                        <div className="avt"></div>
                        <div className="author">{messageContent.author}</div>
                        {/* <p id="time">{messageContent.time}</p> */}
                        {/* <p id="author">{messageContent.author}</p> */}
                      </div>
                      <div className="message-content">
                        {messageContent.message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="enter-space">
            <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" &&
                  sendData("i wanna be yours", "you wanna be mine");
              }}
            />
            <button
              onClick={() => {
                sendData("i wanna be yours", "you wanna be mine");
              }}
            >
              &#9658;
            </button>
          </div>
        </div>
      </div>
      <div
        className={contactZoomIn ? "chat-box zoom-in" : "chat-box zoom-in none"}
      >
        <Messenger height={50} width={50} clickContact={clickContact} />
      </div>
    </div>
  );
};

export default GridBoard;
