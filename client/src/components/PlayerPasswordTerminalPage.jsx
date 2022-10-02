import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useLocation } from "react-router";
import MyInput from "./UI/input/MyInput";

const PlayerPasswordTerminalPage = () => {
    const [playerPassword, setPlayerPassword] = useState({password:''})
    
    const location = useLocation()
    const command = location.state[0].command
    const terminal = location.state[0].terminal
    const commandNumber = location.state[0].commandNumber
    const navigate = useNavigate()

    const onKeyPress = e => {
        if (e.charCode === 13) {
          switch(playerPassword.title.toLowerCase()) {
            case 'назад':
              navigate(-1)
              break
            case 'меню':
              navigate('/PlayerTerminalPage/'+ terminal)
              break
            case command.password :
              navigate('/PlayerTerminalPage/'+ terminal +'/TerminalCommand/' + command.title, {state: {command: command, terminal: terminal, commandNumber: commandNumber}})
              break
            case command.hackingCommand :
              navigate('/PlayerTerminalPage/'+ terminal +'/PlayerHackerTerminalPage/' + command.title, {state: {command: command, terminal: terminal, commandNumber: commandNumber}})
              break
            default:
          }
        }
    }

    return(
        <div>
            <strong>{command.title}</strong><br/>
            Заблокировано <br/>
            Введите пароль <br/>
            <hr style = {{margin: '10px 0'}}/>
            <strong>Доступные команды:</strong><br/>
            Назад
            <MyInput
            name = "password"
            value = {playerPassword.title}
            onChange = {e => setPlayerPassword({...playerPassword, title: e.target.value})}
            onKeyPress = {onKeyPress}
            type = "text" 
            placeholder='Команда'/>
        </div>
    )
}

export {PlayerPasswordTerminalPage};