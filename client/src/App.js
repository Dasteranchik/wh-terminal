import React from 'react'
import { Routes, Route} from 'react-router-dom'
import './styles/App.css'

import { MainPage } from './components/MainPage';
import { PlayerTerminalPage } from './components/PlayerTerminalPage'
import { PlayerPasswordTerminalPage } from './components/PlayerPasswordTerminalPage'
import { AdminCreateTerminalPage } from './components/AdminCreateTerminalPage'
import { TerminalCommand } from './components/TerminalCommand';
import { TerminalSubCommand } from './components/TerminalSubCommand';
import { PlayerHackerTerminalPage } from './components/PlayerHackerTerminalPage';
import { AdminEditTerminalPage } from './components/AdminEditTerminalPage';

function App() {
  return (
    <div className = "App">
      <header>
      </header>
      <Routes>
        <Route path='/' element = {<MainPage/>} />
        <Route path='/PlayerTerminalPage/:title' element = {<PlayerTerminalPage />} />
        <Route path='/AdminEditTerminalPage/:title' element = {<AdminEditTerminalPage />} />
        <Route path='/PlayerTerminalPage/:title/PlayerPasswordTerminalPage/:command:title' element = {<PlayerPasswordTerminalPage />} />
        <Route path='/PlayerTerminalPage/:title/PlayerHackerTerminalPage/:command:title' element = {<PlayerHackerTerminalPage />} />
        <Route path='/PlayerTerminalPage/:title/TerminalCommand/:command:title' element = {<TerminalCommand />} />
        <Route path='/PlayerTerminalPage/:title/TerminalCommand/:command:title/TerminalSubCommand/:subCommand:title' element = {<TerminalSubCommand />} />
        <Route path='/AdminCreateTerminalPage' element = {<AdminCreateTerminalPage />} />
      </Routes>
    </div>
  );
}

export default App;
