import RankingCrown from "../icons/RankingCrown";
import Banner from "../icons/Banner";
import CloseSetting from "../icons/CloseSetting";
import Top1 from "../icons/Top1";
import Top2 from "../icons/Top2";
import Top3 from "../icons/Top3";
import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "react";
const Ranking = ({closeRanking}) => {
  const [rankingMatrix, setRankingMatrix] = useState([]);
  const moutedFunction = async () => {
    try {
      const reponse = await axios.get(`http://localhost:8080/api/users`);
      console.log(reponse.data);
      if (reponse.data) {
        setRankingMatrix(reponse.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    moutedFunction();
  }, []);
  return (
    <div className="banner">
      <div className="header-banner">
        <div className="banner-icon">
          <Banner height={300} width={400} />
        </div>
        <div className="ranking-total-icon">
          <RankingCrown height={100} width={100} />
          <div className="close-btn" onClick={closeRanking}><CloseSetting width={50} height={50}/></div>
        </div>
        <div className="ranking-title">Ranking</div>
      </div>
      <div className="body-banner">
        {rankingMatrix.map((item, index) => {
          return (
            <div className="banner-item" key={index}>
              {index<=2 ? 
              <div className="banner-icon-item">
                {index===0 ? <Top1 height={50} width={50} /> : index===1 ? <Top2 height={50} width={50} /> : index===2 ? <Top3 height={50} width={50} /> : <></>}
              </div> : <></>}              
              <div className="banner-icon-username">{item.userName}</div>
              <div className="banner-icon-score">Score: {item.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;
