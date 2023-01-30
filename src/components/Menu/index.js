import React, { useState } from "react";
import LeftArrow from "../icons/LeftArrow";
import MultipleUsers from "../icons/MultipleUsers";
import Setting from "../icons/Setting";
import SingleUser from "../icons/SingleUser";
import Ranking from "../icons/Ranking";
import Authen from "./Authen";
import "./index.scss";
const Menu = ({changeIsLoginSystem, isLoginSystem}) => {
  const [isAuthen, setAuthen] = useState(false)
  const clickAuthen = () => {
    setAuthen(!isAuthen)
  }
  return (
    <div className={!isLoginSystem ? "menu" : "menu none"}>
      <div className="menu_header">
        <div className="icon-menu">
          <LeftArrow height={35} width={35} />
        </div>
        <div className="title-menu">Caro Desktop Game</div>
        <div className="icon-menu">
          <Setting height={35} width={35} />
        </div>
      </div>
      <div className="body-menu">
        <div className="body_menu-item" onClick={clickAuthen}>
          <SingleUser height={40} width={40} />
          Single Player
        </div>
        <div className="body_menu-item" onClick={clickAuthen}>
          <MultipleUsers height={40} width={40} />
          Multi Player
        </div>
        <div className="body_menu-item">
          <Ranking height={40} width={40} />
          Ranking
        </div>
      </div>
      <div className={isAuthen ? "authenticate" : "authenticate none"}><Authen changeIsLoginSystem={changeIsLoginSystem} clickAuthen={clickAuthen}/></div>
    </div>
  );
};

export default Menu;
