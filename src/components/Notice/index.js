import LeftArrow from "../icons/LeftArrow";
import "./index.scss";
const YouWin = ({ openMenu, closeAiGrid }) => {
  return (
    <div className="you-win">
      <div
        className="left-arrow"
        onClick={() => {
          openMenu && openMenu();
          closeAiGrid && closeAiGrid();
        }}
      >
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
const YouLose = ({ openMenu, closeAiGrid }) => {
  return (
    <div className="you-lose">
      <div
        className="left-arrow"
        onClick={() => {
          openMenu && openMenu();
          closeAiGrid && closeAiGrid();
        }}
      >
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
const JustPlay = ({ openMenu }) => {
  return (
    <div className="just-play">
      <div className="left-arrow" onClick={openMenu}>
        <LeftArrow width={50} height={50} />
      </div>
    </div>
  );
};
export { YouWin, YouLose, JustPlay };
