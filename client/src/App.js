import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import './styles/App.css'

import { MainPage } from './components/MainPage';
import { PlayerStartedTerminalPage } from './components/PlayerStartedTerminalPage'
import { PlayerPasswordTerminalPage } from './components/PlayerPasswordTerminalPage'
import { AdminCreateTerminalPage } from './components/AdminCreateTerminalPage'
import { PlayerHackerTerminalPage } from './components/PlayerHackerTerminalPage';
import MyButton from './components/UI/button/MyButton';

function App() {
  return (
    <div className = "App">
      <header>
        <MyButton> <Link to = "/">Home </Link> </MyButton>
        <MyButton> <Link to ='/PlayerStartedTerminalPage'>PlayerStartedTerminalPage </Link> </MyButton>
        <MyButton> <Link to ='/PlayerPasswordTerminalPage'>PlayerPasswordTerminalPage </Link> </MyButton>
        <MyButton> <Link to ='/PlayerHackerTerminalPage'>PlayerHackerTerminalPage </Link> </MyButton>
        <MyButton> <Link to ='/AdminCreateTerminalPage'>AdminCreateTerminalPage </Link> </MyButton>
      </header>
      <Routes>
        <Route path='/' element = {<MainPage/>} />
        <Route path='/PlayerStartedTerminalPage' element = {<PlayerStartedTerminalPage />} />
        <Route path='/PlayerPasswordTerminalPage' element = {<PlayerPasswordTerminalPage />} />
        <Route path='/PlayerHackerTerminalPage' element = {<PlayerHackerTerminalPage />} />
        <Route path='/AdminCreateTerminalPage' element = {<AdminCreateTerminalPage />} />
      </Routes>
    </div>
  );
}

export default App;
