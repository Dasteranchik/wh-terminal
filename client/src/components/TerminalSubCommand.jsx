import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import MyButton from "./UI/button/MyButton"
import MyInput from "./UI/input/MyInput"


const TerminalSubCommand = () => {
    const [subCommandPlayer, setSubCommandPlayer] = useState({title : ''});

    const location = useLocation()
    const command = location.state.subCommand
    const terminal = location.state.terminal
    const navigate = useNavigate()
    
    const onKeyPress = e => {
        if (e.charCode === 13) {
            terminal.commands.forEach((e) => {
                if(e.title === subCommandPlayer.title) {
                    navigate('/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + e.title, {state: [{ command: e, terminal: terminal.title }]})
                }
            })
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
                        {/* <MyButton> <Link to ={'/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + input.title} state={[{ command: input, terminal: terminal.title }]}> Открыть </Link> </MyButton> */}
                    </div>
                )
            })}
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

export {TerminalSubCommand};