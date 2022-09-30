import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import './styles/App.css'

import { MainPage } from './components/MainPage';
import { PlayerTerminalPage } from './components/PlayerTerminalPage'
import { PlayerPasswordTerminalPage } from './components/PlayerPasswordTerminalPage'
import { AdminCreateTerminalPage } from './components/AdminCreateTerminalPage'
import { TerminalCommand } from './components/TerminalCommand';
import MyButton from './components/UI/button/MyButton';

function App() {
  return (
    <div className = "App">
      <header>
        <MyButton> <Link to = "/">Home </Link> </MyButton>
        {/* <MyButton> <Link to ='/PlayerTerminalPage'>PlayerTerminalPage </Link> </MyButton> */}
        <MyButton> <Link to ='/PlayerPasswordTerminalPage'>PlayerPasswordTerminalPage </Link> </MyButton>
        <MyButton> <Link to ='/TerminalCommand'>TerminalCommand </Link> </MyButton>
        <MyButton> <Link to ='/AdminCreateTerminalPage'>AdminCreateTerminalPage </Link> </MyButton>
      </header>
      <Routes>
        <Route path='/' element = {<MainPage/>} />
        <Route path='/PlayerTerminalPage/:title' element = {<PlayerTerminalPage />} />
        <Route path='/PlayerTerminalPage/:title/PlayerPasswordTerminalPage/:command:title' element = {<PlayerPasswordTerminalPage />} />
        <Route path='/PlayerTerminalPage/:title/TerminalCommand/:command:title' element = {<TerminalCommand />} />
        <Route path='/AdminCreateTerminalPage' element = {<AdminCreateTerminalPage />} />
      </Routes>
    </div>
  );
}

export default App;
