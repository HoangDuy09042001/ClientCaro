import React, { useRef, useEffect, useState } from "react";
import Minimax from "tic-tac-toe-minimax";
import X from "../icons/X";
import O from "../icons/O";
import { YouLose, YouWin } from "../Notice";
import "./index.scss";
const { GameStep } = Minimax;

const GridBoardSingle = ({ room, difficulty, closeAiGrid }) => {
  useEffect(() => {
    console.log("diffi", difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [count, setCount] = useState(20);
  const intervalId = useRef();
  const [score_1] = useState(0);
  const [score_2] = useState(0);
  const [turn, setTurn] = useState(true);
  const [winPlayer, setWinPlayer] = useState(null);
  const huPlayer = "X";
  const aiPlayer = "O";
  const symbols = {
    huPlayer: huPlayer,
    aiPlayer: aiPlayer,
  };
  const [continueGame, setContinueGame] = useState(true);
  // "Easy"|"Normal"|"Hard"
  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) return prev - 1;
        else {
          return 20;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId.current);
  });
  const humanClick = (index) => {
    board[index] = huPlayer;
    setBoard(board);
    setTurn(false);
  };
  useEffect(() => {
    if(winPlayer!==null)
    setContinueGame(false);
  }, [winPlayer]);
  useEffect(() => {
    if (!turn) {
      setBoard(GameStep(board, symbols, difficulty).board);
      setWinPlayer(GameStep(board, symbols, difficulty).winner);
      setTurn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);
  return (
    <>
      {continueGame && (
        <div className="grid-board-single">
          <div className="header-grid-board">
            <div className="hbg-item">You: {score_1}</div>
            <div className="hbg-item">AI: {score_2}</div>
          </div>
          <div className="info-turn">
            <div className="turn">
              {turn === true
                ? "This is your turn"
                : turn === false
                ? "This is AI's turn"
                : ""}
            </div>
            <div className="time">Time: {count}</div>
          </div>
          <div className="body-grid-board">
            <div className="space-playing">
              <div className="line">
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(0);
                  }}
                >
                  {board[0] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[0] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(1);
                  }}
                >
                  {board[1] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[1] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(2);
                  }}
                >
                  {board[2] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[2] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="line">
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(3);
                  }}
                >
                  {board[3] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[3] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(4);
                  }}
                >
                  {board[4] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[4] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(5);
                  }}
                >
                  {board[5] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[5] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="line">
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(6);
                  }}
                >
                  {board[6] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[6] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(7);
                  }}
                >
                  {board[7] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[7] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="sub-line"
                  onClick={() => {
                    humanClick(8);
                  }}
                >
                  {board[8] === huPlayer ? (
                    <X height={30} width={30} />
                  ) : board[8] === aiPlayer ? (
                    <O height={30} width={30} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="room">Room: {room} </div>
        </div>
      )}
      {!continueGame &&
        (winPlayer === "huPlayer" ? (
          <YouWin closeAiGrid={closeAiGrid} />
        ) : (
          <YouLose closeAiGrid={closeAiGrid} />
        ))}
    </>
  );
};

export default GridBoardSingle;
