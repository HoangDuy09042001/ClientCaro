import React, { useState } from "react";
import Authen from "./Authen";
import SettingComponent from "../Setting";
import Theme from "../Theme";
import "./index.scss";
const Menu = ({
  changeState,
  changeIsLoginSystem,
  difficulty,
  changeTheme,
  isLoginSystem,
  userInfors,
  setEasyMode,
  setNormalMode,
  setHardMode,
}) => {
  const StateMenu = {
    setting: "setting",
    mulgame: "mulgame",
    theme: 'theme',
  };
  const [isAuthen, setAuthen] = useState(false);
  const closeAuthen = () => {
    setAuthen(false);
  };
  const [stateMenu, setStateMenu] = useState(null);
  const changeStateMenu = (s) => {
    setStateMenu(s);
  };
  return (
    <div className="menu">
      <div className="menu_header">
        <div className="icon-setting"></div>
        <div className="title-menu">Caro Desktop Game</div>
        <div className="icon-setting">
          <div className="setting-theme" onClick={()=>{
            changeStateMenu("theme");
            if (isLoginSystem === false) {
              setAuthen(true);
            }
          }}>Theme</div>
          <div
            className="setting-verify"
            onClick={() => {
              changeStateMenu("setting");
              if (isLoginSystem === false) {
                setAuthen(true);
              }
            }}
          >
            Verify
          </div>
        </div>
      </div>
      <div className="body-menu">
        <div
          className="body_menu-item"
          onClick={() => {
            changeState("siggame");
          }}
        >
          Single Player
          <div className="choices">
            <div className={difficulty==='Easy' ? "choice-btn active" : "choice-btn"} onClick={setEasyMode}>
              Easy
            </div>
            <div className={difficulty==='Normal' ? "choice-btn active" : "choice-btn"} onClick={setNormalMode}>
              Normal
            </div>
            <div className={difficulty==='Hard' ? "choice-btn active" : "choice-btn"} onClick={setHardMode}>
              Hard
            </div>
          </div>
        </div>
        <div
          className="body_menu-item"
          onClick={() => {
            changeStateMenu("mulgame");
            if (isLoginSystem === true) {
              changeState("room");
            } else if (isLoginSystem === false) {
              setAuthen(true);
            }
          }}
        >
          Multi Player
        </div>
        <div
          className="body_menu-item"
          onClick={() => {
            changeState("ranking");
          }}
        >
          Ranking
        </div>
      </div>
      {isAuthen && (
        <div className="authenticate">
          <Authen
            changeIsLoginSystem={changeIsLoginSystem}
            closeAuthen={closeAuthen}
            changeState={changeState}
            stateMenu={stateMenu}
          />
        </div>
      )}
      {stateMenu === StateMenu.theme && isLoginSystem && (
        <div className="setting-component">
          <Theme
            changeTheme={changeTheme}
            changeStateMenu={changeStateMenu}
          />
        </div>
      )}
      {stateMenu === StateMenu.setting && isLoginSystem && (
        <div className="setting-component">
          <SettingComponent
            userInfors={userInfors}
            changeStateMenu={changeStateMenu}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
