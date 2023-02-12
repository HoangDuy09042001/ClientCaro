import Menu from "./components/Menu";
import Room from "./components/Room";
import Ranking from "./components/Ranking";
import GridBoardSingle from "./components/GridBoardSingle";
import { useState } from "react";
import "./App.scss";

function App() {
  const [isLoginSystem, setIsLoginSystem] = useState(false);
  const [isMenu, setMenu] = useState(true);
  const [ranking, setRanking] = useState(false);
  const [aiGrid, setAiGrid] = useState(false);
  const [multiplePlayer, setMultiplePlayer] = useState(false);
  const [playRound, setPlayRound] = useState(false);
  const [userInfors, setUserInfors] = useState({
    idNode: "",
    id: "",
    userName: "",
    imgUrl: "",
    verify: false,
  });
  const [difficulty, setDifficulty] = useState("Easy");
  const setEasyMode = (event) => {
    event.stopPropagation();
    setDifficulty("Easy");
  };
  const setNormalMode = (event) => {
    event.stopPropagation();
    setDifficulty("Normal");
  };
  const setHardMode = (event) => {
    event.stopPropagation();
    setDifficulty("Hard");
  };
  const closeMenu = () => {
    setMenu(false);
  };
  const onpenPlayRound = () => {
    setPlayRound(true);
  };
  const openMultiplePlayer = () => {
    setMultiplePlayer(true);
  };
  const closeMultiplePlayer = () => {
    setMultiplePlayer(false);
    setMenu(true);
    setRanking(false);
    setPlayRound(false);
  };
  const closeRanking = () => {
    setRanking(false);
    setMenu(true);
    setRanking(false);
    setPlayRound(false);
  };
  const closeAiGrid=()=>{
    setAiGrid(false);
    setMenu(true);
    setRanking(false);
    setPlayRound(false);
  }
  const changeIsLoginSystem = (reponse) => {
    setUserInfors({
      idNode: reponse.idNode,
      id: reponse.id,
      userName: reponse.userName,
      imgUrl: reponse.imgUrl,
      verify: reponse.verify,
    });
    setIsLoginSystem(!isLoginSystem);
  };
  const changeRanking = () => {
    setRanking(true);
  };

  const openSigleGrid = () => {
    setPlayRound(true);
    setAiGrid(true);
  };
  return (
    <div className="App">
      {isMenu && !ranking && !playRound && (
        <Menu
          closeMenu={closeMenu}
          changeIsLoginSystem={changeIsLoginSystem}
          isLoginSystem={isLoginSystem}
          changeRanking={changeRanking}
          openSigleGrid={openSigleGrid}
          openMultiplePlayer={openMultiplePlayer}
          onpenPlayRound={onpenPlayRound}
          multiplePlayer={multiplePlayer}
          userInfors={userInfors}
          setEasyMode={setEasyMode}
          setNormalMode={setNormalMode}
          setHardMode={setHardMode}
        />
      )}
      {multiplePlayer && (
        <Room
          isLoginSystem={isLoginSystem}
          size={8}
          userInfors={userInfors}
          ranking={ranking}
          closeMultiplePlayer={closeMultiplePlayer}
        />
      )}
      {ranking && <Ranking closeRanking={closeRanking} />}
      {aiGrid && <GridBoardSingle size={3} difficulty={difficulty} closeAiGrid={closeAiGrid}/>}
    </div>
  );
}

export default App;
