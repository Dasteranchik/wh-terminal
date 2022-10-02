import { useNavigate } from "react-router";
import { Link} from 'react-router-dom'
import React, {useState, useEffect} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from './UI/button/MyButton';
import axios from "axios";

const PlayerTerminalPage = () => {
    const [commandPlayer, setCommandPlayer] = useState({title : ''});
    const [terminal, setTerminal] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      axios.post('http://localhost:5001/api/ReturnFindOneTerminal', {
        title: decodeURI(window.location.href.split('Page/')[1])
      }).then(response => setTerminal(response.data))
    }, []); 

    const onKeyPress = e => {
        if (e.charCode === 13) {
            for(let i = 0; i < terminal.commands.length; i++) {
                if(terminal.commands[i].title.toLowerCase() === commandPlayer.title.toLowerCase()) {
                  terminal.commands[i].password ?
                    navigate('/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + terminal.commands[i].title, {state: [{ command: terminal.commands[i], terminal: terminal.title, commandNumber: i }]}):
                    navigate('/PlayerTerminalPage/'+ terminal.title +'/TerminalCommand/' + terminal.commands[i].title, {state: {command: terminal.commands[i], terminal: terminal.title, commandNumber: i}})
                }
            }
        }
    }


     return ( terminal ?
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
            onKeyPress = {onKeyPress}
            type = "text" 
            placeholder='Наименование команды'/>
        </div>:
        <div>
            Загрузка
        </div>
    )
}
export {PlayerTerminalPage};