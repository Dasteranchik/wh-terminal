import { useParams, useLocation, useNavigate } from "react-router";
import { Routes, Route, Link} from 'react-router-dom'
import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from './UI/button/MyButton';

const PlayerTerminalPage = () => {
    const [commandPlayer, setCommandPlayer] = useState({title : ''});
    const params = useParams()
    const location = useLocation()
    const terminal = location.state.terminal
    const title = params.title
    const navigate = useNavigate()

    const onKeyPress = e => {
        if (e.charCode === 13) {
            terminal.commands.forEach((e) => {
                if(e.title === commandPlayer.title) {
                    navigate('/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + e.title, {state: [{ command: e, terminal: terminal.title }]})
                }
            })
        }
    }

    return(
        <div className="post__content">
            <strong>{terminal.title}</strong>
            <div>
                {terminal.description}
            </div>
            <hr style = {{margin: '10px 0'}}/>
            <strong>Доступные команды:</strong>
            {terminal.commands.map((input, index) => {
            return(
                <div key = {index}>
                    {input.title} <br/>
                    <MyButton> <Link to ={'/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + input.title} state={[{ command: input, terminal: terminal.title }]}> Открыть </Link> </MyButton>
                </div>
            )
        })}
        <hr style = {{margin: '10px 0'}}/>
        <strong>Введите команду:</strong>
        
        <MyInput
            name = "commandPlayer"
            value = {commandPlayer.title}
            onChange = {e => setCommandPlayer({...commandPlayer, title: e.target.value})}
            onKeyPress = {onKeyPress}
            type = "text" 
            placeholder='Наименование команды'/>
        </div>
        
    )
}

export {PlayerTerminalPage};