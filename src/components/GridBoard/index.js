import React, {useRef, useEffect, useMemo, useState } from "react";
import axios from "axios";
import X from "../icons/X";
import O from "../icons/O";
import Messenger from "../icons/Messenger";
import ScrollToBottom from "react-scroll-to-bottom";
import "./index.scss";

const GridBoard = ({ size, socket, username, room, id, idNode, openMenu }) => {
  const [score_1, setScore_1] = useState(0);
  const [score_2, setScore_2] = useState(0);
  const [opponent, setOpponent] = useState({
    idNode: '',
    id: ''
  })
  const [turn, setTurn] = useState();
  const [contactZoomIn, setContactZoom] = useState(true);
  const [grid, setGrid] = useState([]);
  const [begin, setBegin] = useState(false)
  
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
  
  useEffect(()=> {
    moutedFunction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const moutedFunction = async () => {
    console.log('send room')
    const moutedVari = {
      member: true,
      room: room,
      id: id,
      idNode: idNode,
      author: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_room", moutedVari);
  }
  const sendData = async (row, column) => {
    if (typeof row === "string" && typeof column === "string") {
      if (currentMessage !== "") {
        const messageData = {
          chat: true,
          room: room,
          id: id,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_data", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    } else {
      const data = {
        grid: true,
        row,
        column,
        id: id,
        room: room,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_data", data);
      setGrid((list) => [...list, data]);
    }
  };
  
  useEffect(() => {
    socket.on("receive_data", (data) => {
      data.chat &&
        setMessageList((list) => {
          return [...list, data];
      });
      data.grid &&
        setGrid((list) => {
          return [...list, data];
        });
        console.log('grid', grid)  
      });
    socket.on("receive_room", (data) => {
      console.log('data', data)
    });
    socket.on("receive_win", (data) => {
      console.log('data', data)
      if(data.win) {
        if (data.id !== id) {
          setScore_2(data.score_1)
        }
        
      }
      setGrid(()=>{
        for (var i = 0; i < size; i++) {
          for (var j = 0; j < size; j++) {
            initalMatrix[i][j] = false;
          }
        }
        return []
      })
    });
    socket.on("start_room", (data) => {
      if(data.begin && data.number === 2 ) {
        if(data.firstStep === id) {
          console.log('start room', data)
          setOpponent({
            idNode: data.secondStepNode,
            id: data.secondStep
          })
          setTurn(true)
        } else {
          setOpponent({
            idNode: data.firstStepNode,
            id: data.firstStep
          })
          setTurn(false)
        }
        setBegin(true)
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  

  useEffect(() => {
    console.log(grid);
    grid.forEach((value) => {
      initalMatrix[value.row][value.column] = value.id;
    });
    checkWin()
    if(count<20) {
      setCount(20)
    }
    if(grid.length>0) {
      if(grid[grid.length-1].id === id) {
        setTurn(false)
      }else setTurn(true)
    }
    intervalId.current = setInterval(() => {
      setCount(prev => {
        if(prev>0) return prev - 1
        else {
          return 20
        }
      });
    }, 1000);
    return () => clearInterval(intervalId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  

  const [count, setCount] = useState(20);

  const intervalId = useRef();
  const clickContact = () => {
    setContactZoom(!contactZoomIn);
  };
  useEffect(()=>{
    if(count===0) {
      setTurn(!turn)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
  
  const handleWin = async ()=> {
    console.log('I win')
    let tmpscore_1 = score_1
    let tmpscore_2 = score_2
    tmpscore_1++
    setScore_1(score_1+1)
    const winInfors = {
      win: true,
      room: room,
      id: id,
      score_1: tmpscore_1,
      score_2: tmpscore_2,
      author: username,
      time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes() +
      ":" +
      new Date(Date.now()).getSeconds()
    }
    await socket.emit("send_win", winInfors);
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        initalMatrix[i][j] = false;
      }
    }
    setGrid([])
  }
  const checkWin = async ()=> {
    console.log('check Win')
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        let countWinRow = 0
        let countWinCol = 0
        let countDiaLeft = 0
        let countDiaRight = 0
        if(initalMatrix[i][j]===id) {
          //checkRowWin
          countWinRow++
          let jCheckRow = j
          while(jCheckRow>=1) {
            jCheckRow--
            if(initalMatrix[i][jCheckRow]===id) {
              countWinRow++
              if(countWinRow===5) {
                handleWin()
                return
              }
            }else break
          }

          //checkColWin
          countWinCol++
          let iCheckRow = i
          while(iCheckRow>=1) {
            iCheckRow--
            if(initalMatrix[iCheckRow][j]===id) {
              countWinCol++
              if(countWinCol===5) {
                handleWin()
                return
              }
            }else break
          }

          //checkDiaLeftWin
          countDiaLeft++
          let iCheckDiaLeft = i
          let jCheckDiaLeft = j
          while(iCheckDiaLeft<size-1 && jCheckDiaLeft>0) {
            iCheckDiaLeft++
            jCheckDiaLeft--
            if(initalMatrix[iCheckDiaLeft][jCheckDiaLeft]===id) {
              countDiaLeft++
              if(countDiaLeft===5) {
                handleWin()
                return
              }
            }else break
          }

          //checkColWin
          countDiaRight++
          let iCheckDiaRight = i
          let jCheckDiaRight = j
          while(iCheckDiaRight<size-1 && jCheckDiaRight<size-1) {
            iCheckDiaRight++
            jCheckDiaRight++
            if(initalMatrix[iCheckDiaRight][jCheckDiaRight]===id) {
              countDiaRight++
              if(countDiaRight===5) {
                handleWin()
                return
              }
            }else break
          }

        }
      }
    }
  }
  
  const sendWinGame = async () => {
    const data = {
      winGame: true,
      room: room,
      idWin: score_1>=2 ? id : opponent.id,
      idWinNode: score_1>=2 ? idNode : opponent.idNode,
      idLose: score_1>=2 ? opponent.id : id, 
      idLoseNode: score_1>=2 ? opponent.idNode : idNode, 
      winScore: score_1>=2 ? score_1: score_2,
      loseScore:  score_1>=2 ? score_2: score_1,
      author: username,
      time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes() +
      ":" +
      new Date(Date.now()).getSeconds()
    }
    try {
      const reponse = await axios.post(`http://localhost:8080/api/user/history`, {
        ...data  
      });
      
      await axios.put(`http://localhost:8080/api/user/${data.idWinNode}`, {
        plus: true 
      });
      await axios.put(`http://localhost:8080/api/user/${data.idLoseNode}`, {
        plus: false 
      });

      
      console.log(reponse.data);
      if (reponse.data) {
      }
    } catch (err) {
      console.log(err);
    }
    openMenu()
  };
  useEffect(()=>{
   if(score_1>=2) {
    sendWinGame()
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score_1])
  useEffect(()=>{
    if(score_2>=2)
    openMenu() 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score_2])
  
  return (
    <div className="grid-board">
      <div className="header-grid-board">
        <div className="hbg-item">You: {score_1}</div>
        <div className="hbg-item">Component: {score_2}</div>
      </div>
      <div className="info-turn">
        <div className="turn">
          {turn===true ? "This is your turn" : turn===false ? "This is component's turn" : ''}
        </div>
        <div className={begin ? "time" : "time none"}>Time: {count}</div>
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
                      {ite === id ? (
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
      <div className="room">Room: {room} </div>
    </div>
  );
};

export default GridBoard;
