import Menu from './components/Menu';
import Room from './components/Room';
import { useState } from 'react';

function App() {
  const [isLoginSystem, setIsLoginSystem] = useState(false)
  const changeIsLoginSystem = () => {
    setIsLoginSystem(!isLoginSystem)
  }


  return (
    <div className="App">
      <Menu changeIsLoginSystem={changeIsLoginSystem} isLoginSystem={isLoginSystem}/>
      <Room isLoginSystem={isLoginSystem} size={8}/>
    </div>
  );
}

export default App;
