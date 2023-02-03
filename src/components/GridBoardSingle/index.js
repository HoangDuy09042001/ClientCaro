import React, {useEffect, useState } from "react";
import X from "../icons/X";
import O from "../icons/O";
import "./index.scss";

const GridBoardSingle = ({size, room}) => {
  const [score_1] = useState(0)
  const [score_2] = useState(0)
  const [turn] = useState(true)
  const [count, setCount] = useState(20)
  const [initalMatrix] = useState(() => {
    const initalMatrix = new Array(2);
    for (var i = 0; i < size; i++) {
      if (!initalMatrix[i]) initalMatrix[i] = [];
      for (var j = 0; j < size; j++) {
        initalMatrix[i][j] = false;
      }
    }
    return initalMatrix;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  useEffect(()=>{
    setInterval(()=>{
      setCount(prev=>prev-1)
    }, 1000)
  },[])
  // const human='human'
  // const ai= 'ai'

  // function bestMove() {
  //   // AI to make its turn
  //   let bestScore = -Infinity;
  //   let move;
    
  //   for (let i = 0; i < size; i++) {
  //     for (let j = 0; j < size; j++) {
  //       // Is the spot available?
  //       if (initalMatrix[i][j] === false) {
  //         initalMatrix[i][j] = ai;
  //         let score = minimax(initalMatrix, 0, false);
  //         initalMatrix[i][j] = false;
  //         if (score > bestScore) {
  //           bestScore = score;
  //           move = { i, j };
  //         }
  //       }
  //     }
  //   }
  
  //   initalMatrix[move.i][move.j] = ai;
  //   currentPlayer = human;
  // }
  
  // let scores = {
  //   AI: 10,
  //   Player: -10,
  //   tie: 0
  // };
  // let currentPlayer = human
  // function mousePressed(row, col) {
  //   if (currentPlayer === human) {
  //     // Human make turn
  //     // If valid turn
  //     if (initalMatrix[row][col] === false) {
  //       initalMatrix[row][col] = human;
  //       currentPlayer = ai;
  //       setTimeout(bestMove, 400);
        
  //     }
  //   }
  // }
  // const checkWinner =  ()=> {
  //   let winner = null
  //   console.log('check Win')
  //   for (var i = 0; i < size; i++) {
  //     for (var j = 0; j < size; j++) {
  //       let countWinRow = 0
  //       let countWinCol = 0
  //       let countDiaLeft = 0
  //       let countDiaRight = 0
  //       if(initalMatrix[i][j]===human) {
  //         //checkRowWin
  //         countWinRow++
  //         let jCheckRow = j
  //         while(jCheckRow>=1) {
  //           jCheckRow--
  //           if(initalMatrix[i][jCheckRow]===human) {
  //             countWinRow++
  //             if(countWinRow===5) {
  //               winner = human
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkColWin
  //         countWinCol++
  //         let iCheckRow = i
  //         while(iCheckRow>=1) {
  //           iCheckRow--
  //           if(initalMatrix[iCheckRow][j]===human) {
  //             countWinCol++
  //             if(countWinCol===5) {
  //               winner = human
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkDiaLeftWin
  //         countDiaLeft++
  //         let iCheckDiaLeft = i
  //         let jCheckDiaLeft = j
  //         while(iCheckDiaLeft<size-1 && jCheckDiaLeft>0) {
  //           iCheckDiaLeft++
  //           jCheckDiaLeft--
  //           if(initalMatrix[iCheckDiaLeft][jCheckDiaLeft]===human) {
  //             countDiaLeft++
  //             if(countDiaLeft===5) {
  //               winner = human
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkColWin
  //         countDiaRight++
  //         let iCheckDiaRight = i
  //         let jCheckDiaRight = j
  //         while(iCheckDiaRight<size-1 && jCheckDiaRight<size-1) {
  //           iCheckDiaRight++
  //           jCheckDiaRight++
  //           if(initalMatrix[iCheckDiaRight][jCheckDiaRight]===human) {
  //             countDiaRight++
  //             if(countDiaRight===5) {
  //               winner = human
  //               return winner
  //             }
  //           }else break
  //         }

  //       }else if(initalMatrix[i][j]===ai) {
  //         //checkRowWin
  //         countWinRow++
  //         let jCheckRow = j
  //         while(jCheckRow>=1) {
  //           jCheckRow--
  //           if(initalMatrix[i][jCheckRow]===ai) {
  //             countWinRow++
  //             if(countWinRow===5) {
  //               winner = ai
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkColWin
  //         countWinCol++
  //         let iCheckRow = i
  //         while(iCheckRow>=1) {
  //           iCheckRow--
  //           if(initalMatrix[iCheckRow][j]===ai) {
  //             countWinCol++
  //             if(countWinCol===5) {
  //               winner = ai
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkDiaLeftWin
  //         countDiaLeft++
  //         let iCheckDiaLeft = i
  //         let jCheckDiaLeft = j
  //         while(iCheckDiaLeft<size-1 && jCheckDiaLeft>0) {
  //           iCheckDiaLeft++
  //           jCheckDiaLeft--
  //           if(initalMatrix[iCheckDiaLeft][jCheckDiaLeft]===ai) {
  //             countDiaLeft++
  //             if(countDiaLeft===5) {
  //               winner = ai
  //               return winner
  //             }
  //           }else break
  //         }

  //         //checkColWin
  //         countDiaRight++
  //         let iCheckDiaRight = i
  //         let jCheckDiaRight = j
  //         while(iCheckDiaRight<size-1 && jCheckDiaRight<size-1) {
  //           iCheckDiaRight++
  //           jCheckDiaRight++
  //           if(initalMatrix[iCheckDiaRight][jCheckDiaRight]===ai) {
  //             countDiaRight++
  //             if(countDiaRight===5) {
  //               winner = ai
  //               return winner
  //             }
  //           }else break
  //         }

  //       }
  //     }
  //   }
  //   let openSpots = 0;
  //   for (let i = 0; i < size; i++) {
  //     for (let j = 0; j < size; j++) {
  //       if (initalMatrix[i][j] === false) {
  //         openSpots++;
  //       }
  //     }
  //   }
  
  //   if (winner == null && openSpots === 0) {
  //     return 'tie';
  //   } else {
  //     return winner;
  //   }

  // }
  // function minimax(initalMatrix, depth, isMaximizing) {
  //   let result = checkWinner();
  //   if (result !== null) {
  //     return scores[result];
  //   }
  
  //   if (isMaximizing) {
  //     let bestScore = -Infinity;
  //     for (let i = 0; i < size; i++) {
  //       for (let j = 0; j < size; j++) {
  //         // Is the spot available?
  //         if (initalMatrix[i][j] === false) {
  //           initalMatrix[i][j] = ai;
  //           let score = minimax(initalMatrix, depth + 1, false);
  //           initalMatrix[i][j] = false;
  //           bestScore = score> bestScore ? score : bestScore;
  //         }
  //       }
  //     }
  //     return bestScore;
  //   } else {
  //     let bestScore = Infinity;
  //     for (let i = 0; i < 3; i++) {
  //       for (let j = 0; j < 3; j++) {
  //         // Is the spot available?
  //         if (initalMatrix[i][j] === false) {
  //           initalMatrix[i][j] = human;
  //           let score = minimax(initalMatrix, depth + 1, true);
  //           initalMatrix[i][j] = false;
  //           bestScore = score< bestScore ? score : bestScore;
  //         }
  //       }
  //     }
  //     return bestScore;
  //   }
  // }
  return (
    <div className="grid-initalMatrix">
      <div className="header-grid-initalMatrix">
        <div className="hbg-item">You: {score_1}</div>
        <div className="hbg-item">AI: {score_2}</div>
      </div>
      <div className="info-turn">
        <div className="turn">
          {turn===true ? "This is your turn" : turn===false ? "This is AI turn" : ''}
        </div>
        <div className="time">Time: {count}</div>
      </div>
      <div className="body-grid-initalMatrix">
        <div className="space-playing">
          {initalMatrix.map((item, index) => {
            console.log('hihi')
            return (
              <div className={"line"} key={index}>
                {item.map((ite, idx) => {
                  return (
                    <div
                      className={"sub-line"}
                      key={index + idx + ""}
                      onClick={() => {
                        
                      }}
                    >
                      {ite === '' ? (
                        <X height={30} width={30} />
                      ) : ite === '' ? (
                        <O height={30} width={30} />
                      ) : false}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="room">Room: {room} </div>
    </div>
  );
};

export default GridBoardSingle;
