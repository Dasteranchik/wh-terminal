import { useParams, useLocation } from "react-router";
import { Routes, Route, Link} from 'react-router-dom'
import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from './UI/button/MyButton';

const PlayerStartedTerminalPage = () => {
    const [commandPlayer, setCommandPlayer] = useState({title : ''});
    const params = useParams()
    const location = useLocation()
    const terminal = location.state.terminal
    const title = params.title
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
                    <MyButton> <Link to ={'/PlayerStartedTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + input.title} state={[{ command: input, terminal: terminal.title }]}> Открыть </Link> </MyButton>
                </div>
            )
        })}
        <hr style = {{margin: '10px 0'}}/>
        <strong>Введите команду:</strong>
        
        <MyInput
            name = "commandPlayer"
            value = {commandPlayer.title}
            onChange = {e => setCommandPlayer({...commandPlayer, title: e.target.value})}
            type = "text" 
            placeholder='Наименование команды'/>
        </div>
        
    )
}

export {PlayerStartedTerminalPage};