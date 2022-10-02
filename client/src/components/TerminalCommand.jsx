import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import MyInput from "./UI/input/MyInput"


const TerminalCommand = () => {
    const [subCommandPlayer, setSubCommandPlayer] = useState({title : ''});

    const location = useLocation()
    const command = location.state.command
    const terminal = location.state.terminal
    const commandNumber = location.state.commandNumber
    const navigate = useNavigate()
    
    const onKeyPress = e => {
        if (e.charCode === 13) {
            for (let i = 0; i < command.commands.length; i++){
                if(command.commands[i].title.toLowerCase() === subCommandPlayer.title.toLowerCase()) {
                navigate('/PlayerTerminalPage/'+ terminal +'/TerminalCommand/' + command.title + '/TerminalSubCommand/' + command.commands[i].title, {state: [{ subCommand: command.commands[i], command: command.title, terminal: terminal, commandNumber : commandNumber, subCommandNumber: i}]})
                }
            }
            if (subCommandPlayer.title === 'назад' ) navigate(-1)
        }
    }

    return(
        <div>
            <strong>{command.title}</strong>
            <div>
                {command.description}
            </div>
            <hr style = {{margin: '10px 0'}}/>
            <strong>Доступные команды:</strong>
            {command.commands.map((input, index) => {
                return(
                    <div key = {index}>
                        {input.title} <br/>
                    </div>
                )
            })}
            Меню<br/>
            Назад
            <hr style = {{margin: '10px 0'}}/>
            <strong>Введите команду:</strong>
            
            <MyInput
                name = "commandPlayer"
                value = {subCommandPlayer.title}
                onChange = {e => setSubCommandPlayer({...subCommandPlayer, title: e.target.value})}
                onKeyPress = {onKeyPress}
                type = "text" 
                placeholder='Наименование команды'/>
        </div>
    )
}

export {TerminalCommand};