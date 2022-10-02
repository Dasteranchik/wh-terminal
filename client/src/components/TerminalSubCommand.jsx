import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import MyInput from "./UI/input/MyInput"


const TerminalSubCommand = () => {
    const [subCommandPlayer, setSubCommandPlayer] = useState({title : ''});

    const location = useLocation()
    const command = location.state[0].command
    const terminal = location.state[0].terminal
    const navigate = useNavigate()
    
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
                    command.state = !command.state
                  break
                default:
              }
        }
    }

    return(
        <div>
            <strong>{command.title}</strong>
            <strong>Доступ разрешён</strong>
            <div>
                {command.description}
            </div>
            <strong>Текущий статус: {command.flag? <div> Вкл</div> : <div> Выкл</div>}</strong>
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