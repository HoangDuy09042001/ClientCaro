import Menu from './components/Menu';
import Room from './components/Room';
import Ranking from './components/Ranking';
// import GridBoardSingle from './components/GridBoardSingle';
import { useState } from 'react';
import './App.scss'

function App() {
  const [isLoginSystem, setIsLoginSystem] = useState(false)
  const [ranking, setRanking] = useState(false)
  const [userInfors, setUserInfors] = useState({
    id: '',
    userName: '',
  })
  const changeIsLoginSystem = (reponse) => {
    setUserInfors({
      idNode: reponse.idNode,
      id: reponse.id,
      userName: reponse.userName
    })
    setIsLoginSystem(!isLoginSystem)
  }
  const changeRanking = ()=> {
    setIsLoginSystem(true)
    setRanking(true)
  }

  const openMenu = ()=> {
    setIsLoginSystem(false)
  }

  return (
    <div className="App">
      <Menu changeIsLoginSystem={changeIsLoginSystem} isLoginSystem={isLoginSystem} changeRanking={changeRanking}/>
      <Room isLoginSystem={isLoginSystem} size={8} userInfors={userInfors} openMenu={openMenu} ranking={ranking}/>
      {ranking&&isLoginSystem&&<Ranking ranking={ranking} isLoginSystem={isLoginSystem}/>}
      {/* <GridBoardSingle size={8}/> */}
    </div>
  );
}

export default App;
