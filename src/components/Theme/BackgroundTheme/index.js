import { useEffect, useState } from "react";
import Close from "../../icons/Close";
import "./index.scss";
function BackgroundTheme({changeTheme, changeStateMenu}) {
  const StateBGI = {
    valentine: "valentine",
    evil: "evil",
    heaven: "heaven",
    honor: "honor",
    chill: "chill",
    latin: "latin",
  };
  const [bgi, setBgI] = useState(null);
  const setBGI = (s) => {
    setBgI(s);
  };
  useEffect(()=>{
    changeTheme(bgi)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgi])
  return (
    <div className="background-theme-component">
      <div className="close-btn" onClick={()=>{changeStateMenu(null)}}><Close/></div>
      <div className="background-theme-title">Background Image Setting</div>  
      <div className="background-theme-body">
        <div className="item-background">
          <div
            className="item-sm-bg valentine"
            onClick={() => {
              setBGI(StateBGI.valentine);
            }}
          >
            Valentine
          </div>
          <div
            className="item-sm-bg evil"
            onClick={() => {
              setBGI(StateBGI.evil);
            }}
          >
            Evil
          </div>
          <div
            className="item-sm-bg heaven"
            onClick={() => {
              setBGI(StateBGI.heaven);
            }}
          >
            Heven
          </div>
        </div>
        <div className="item-background">
          <div
            className="item-sm-bg honor"
            onClick={() => {
              setBGI(StateBGI.honor);
            }}
          >
            Honor
          </div>
          <div
            className="item-sm-bg chill"
            onClick={() => {
              setBGI(StateBGI.chill);
            }}
          >
            Chill
          </div>
          <div
            className="item-sm-bg latin"
            onClick={() => {
              setBGI(StateBGI.latin);
            }}
          >
            Latin
          </div>
        </div>
      </div>
    </div>
  );
}
export default BackgroundTheme;
