import React, { useState } from "react";
import LeftArrow from "../icons/LeftArrow";
import MultipleUsers from "../icons/MultipleUsers";
import Setting from "../icons/Setting";
import SingleUser from "../icons/SingleUser";
import Ranking from "../icons/Ranking";
import Authen from "./Authen";
import SettingComponent from "../Setting";
import "./index.scss";
const Menu = ({
  changeIsLoginSystem,
  changeRanking,
  openSigleGrid,
  openMultiplePlayer,
  isLoginSystem,
  multiplePlayer,
  onpenPlayRound,
  userInfors,
  closeMenu,
  setEasyMode,
  setNormalMode,
  setHardMode
}) => {
  const [isAuthen, setAuthen] = useState(false);
  const [setting, setSetting] = useState(false);
  const [openSettingVar, setOpenSettingVar] = useState(false);
  const clickAuthen = () => {
    setAuthen(!isAuthen);
  };
  const openSetting = () => {
    setSetting(true);
  };
  const checkSetting = () => {
    if (setting === false) {
      setAuthen(true);
    }
    setOpenSettingVar(!openSettingVar);
  };
  const closeSetting = ()=>{
    setSetting(false)
    setOpenSettingVar(false)
  }
  return (
    <div className="menu">
      <div className="menu_header">
        <div className="icon-menu">
          <LeftArrow height={35} width={35} />
        </div>
        <div className="title-menu">Caro Desktop Game</div>
        <div className="icon-menu" onClick={checkSetting}>
          <Setting height={35} width={35} />
        </div>
      </div>
      <div className="body-menu">
        <div className="body_menu-item" onClick={openSigleGrid}>
          <SingleUser height={40} width={40} />
          Single Player
          <div className="choices">
            <div className="choice-btn" onClick={setEasyMode}>Easy</div>
            <div className="choice-btn" onClick={setNormalMode}>Normal</div>
            <div className="choice-btn" onClick={setHardMode}>Hard</div>
          </div>
        </div>
        <div
          className="body_menu-item"
          onClick={() => {
            if (!isLoginSystem) {
              clickAuthen();
            }else if(isLoginSystem) {
              closeMenu()
            }
            openMultiplePlayer();
          }}
        >
          <MultipleUsers height={40} width={40} />
          Multi Player
        </div>
        <div className="body_menu-item" onClick={changeRanking}>
          <Ranking height={40} width={40} />
          Ranking
        </div>
      </div>
      {isAuthen && (
        <div className="authenticate">
          <Authen
            changeIsLoginSystem={changeIsLoginSystem}
            clickAuthen={clickAuthen}
            openSetting={openSetting}
            multiplePlayer={multiplePlayer}
            onpenPlayRound={onpenPlayRound}
          />
        </div>
      )}
      {setting && openSettingVar && (
        <div className="setting-component">
          <SettingComponent userInfors={userInfors} closeSetting={closeSetting}/>
        </div>
      )}
    </div>
  );
};

export default Menu;
