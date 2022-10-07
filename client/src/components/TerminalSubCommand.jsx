import axios from "axios";
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { URL_LOCALHOST } from "../utils/constants";
import MyInput from "./UI/input/MyInput"


const TerminalSubCommand = () => {
    const [subCommandPlayer, setSubCommandPlayer] = useState({title : ''});
    const [playerFlag, setPlayerFlag] = useState({title : false});

    const location = useLocation()
    const subCommand = location.state[0].subCommand
    const terminal = location.state[0].terminal
    const commandNumber = location.state[0].commandNumber
    const subCommandNumber = location.state[0].subCommandNumber
    const navigate = useNavigate()
    const url = URL_LOCALHOST

    useEffect(() => {
        setPlayerFlag(subCommand.flag)
      }, []); 

    const onKeyPress = e => {
        if (e.charCode === 13) {
            switch(subCommandPlayer.title.toLowerCase()) {
                case 'назад':
                  navigate(-1)
                  break
                case 'меню':
                  navigate('/PlayerTerminalPage/'+ terminal)
                  break
                case 'переключить статус' :
                    setPlayerFlag(!playerFlag)
                    axios.post(url + '/api/ChangeTerminalFlag', {
                        title: terminal,
                        command: commandNumber,
                        subCommand: subCommandNumber
                    })
                  break
                default:
              }
        }
    }

    return(
        <div>
            <strong>{subCommand.title}</strong>
            <strong>Доступ разрешён</strong>
            <div>
                {subCommand.description}
            </div>
            <strong>Текущий статус: {playerFlag ? <div> Вкл</div> : <div> Выкл</div>}</strong>
            <hr style = {{margin: '10px 0'}}/>
            <strong>Доступные команды:</strong><br/>
            Переключить статус<br/>
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

export {TerminalSubCommand};