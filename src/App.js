import Menu from "./components/Menu";
import Room from "./components/Room";
import Ranking from "./components/Ranking";
import GridBoardSingle from "./components/GridBoardSingle";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import "./App.scss";
const snowflake1 = document.createElement("img");
snowflake1.src =
  "https://cahilfoley.github.io/react-snowfall/static/media/logo.ad915532acc9ed9d2fba.png";
const images = [snowflake1];
function App() {
  const State = {
    menu: "menu",
    mulgame: "mulgame",
    room: "room",
    siggame: "siggame",
    raking: "ranking",
    authen: "authen",
  };
  const [state, setState] = useState(State.menu);
  const [isLoginSystem, setIsLoginSystem] = useState(false);
  const [userInfors, setUserInfors] = useState({
    idNode: "",
    id: "",
    userName: "",
    imgUrl: "",
    verify: false,
  });
  const [backgroundImage, setBackgroundImage] = useState(
    "https://tophinhanhdep.com/wp-content/uploads/2021/10/Anime-Night-Wallpapers.png"
  );
  const [bgi, setBgI] = useState(null);
  const changeTheme = (s) => {
    setBgI(s);
  };
  useEffect(() => {
    switch (bgi) {
      case "heaven":
        setBackgroundImage(
          "https://lvgames.net/lqm/wp-content/uploads/2018/11/trang-phuc-lauriel-thanh-quang-su-mot-skin-qua-doi-de-thuong-720x480.jpg"
        );
        break;
      case "valentine":
        setBackgroundImage(
          "https://cdn.oneesports.vn/cdn-data/sites/4/2022/02/valentine-9-1024x576.jpeg"
        );
        break;
      case "evil":
        setBackgroundImage(
          "https://hoiquancaothu.com/images/skins/lien-quan/thumbs/lauriel-tinh-van-su.jpg"
        );
        break;
      case "honor":
        setBackgroundImage(
          "https://lienquan.garena.vn/files/upload/images/kahlii.jpg"
        );
        break;
      case "chill":
        setBackgroundImage(
          "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/50.jpg"
        );
        break;
        case "latin":
          setBackgroundImage(
            "https://phongvu.vn/cong-nghe/wp-content/uploads/2022/08/sol.jpg"
          );
          break;  
      default:
    }
  }, [bgi]);
  const changeState = (s) => {
    setState(s);
  };
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
  const changeIsLoginSystem = (reponse) => {
    setUserInfors({
      idNode: reponse.idNode,
      id: reponse.id,
      userName: reponse.userName,
      imgUrl: reponse.imgUrl,
      verify: reponse.verify,
    });
    setIsLoginSystem(true);
  };
  return (
    <div className="App">
      <div
        className="theme"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Snowfall
          style={{
            backgroundColor: "transparent",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
          snowflakeCount={500}
          color={"orange"}
          images={images}
          radius={[0.5, 15.0]}
          wind={[-0.5, 15.0]}
        />
      </div>
      <div className="main-ui">
        {state === State.menu && (
          <Menu
            changeIsLoginSystem={changeIsLoginSystem}
            isLoginSystem={isLoginSystem}
            userInfors={userInfors}
            difficulty={difficulty}
            changeTheme={changeTheme}
            setEasyMode={setEasyMode}
            setNormalMode={setNormalMode}
            setHardMode={setHardMode}
            changeState={changeState}
          />
        )}
        {state === State.room && (
          <Room
            isLoginSystem={isLoginSystem}
            size={8}
            userInfors={userInfors}
            changeState={changeState}
          />
        )}
        {state === State.raking && <Ranking changeState={changeState} />}
        {state === State.siggame && (
          <GridBoardSingle
            size={3}
            difficulty={difficulty}
            changeState={changeState}
          />
        )}
      </div>
    </div>
  );
}

export default App;
