import LeftArrow from "../icons/LeftArrow";
import "./index.scss";
const YouWin = ({ changeState }) => {
  return (
    <div className="you-win">
      <div
        className="left-arrow"
        onClick={() => {
          changeState()
        }}
      >
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
const YouLose = ({ changeState }) => {
  return (
    <div className="you-lose">
      <div
        className="left-arrow"
        onClick={() => {
          changeState()
        }}
      >
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
const JustPlay = ({ changeState }) => {
  return (
    <div className="just-play">
      <div className="left-arrow" onClick={changeState}>
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
export { YouWin, YouLose, JustPlay };
