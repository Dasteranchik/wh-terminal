import { useParams, useLocation } from "react-router";
import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";

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