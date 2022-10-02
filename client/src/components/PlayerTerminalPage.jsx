import { useNavigate } from "react-router";
import { Link} from 'react-router-dom'
import React, {useState, useEffect} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from './UI/button/MyButton';
import { getTerminal } from "./utils/input/input";
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
            terminal.commands.forEach((e) => {
                if(e.title === commandPlayer.title) {
                    e.password ?
                    navigate('/PlayerTerminalPage/' + terminal.title + '/PlayerPasswordTerminalPage/' + e.title, {state: [{ command: e, terminal: terminal.title }]}):
                    navigate('/PlayerTerminalPage/'+ terminal.title +'/TerminalCommand/' + e.title, {state: {command: e, terminal: terminal.title}})
                }
            })
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
        </div>:
        <div>
            Загрузка
        </div>
    )
}
export {PlayerTerminalPage};