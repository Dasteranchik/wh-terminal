import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useLocation } from "react-router";
import MyInput from "./UI/input/MyInput";

const PlayerHackerTerminalPage = () => {
    const [bullsCows, setBullsCows] = useState({bulls:0, cows:0})
    const [playerPassword, setPlayerPassword] = useState({password:''})
    const location = useLocation()
    const command = location.state.command
    const terminal = location.state.terminal
    const navigate = useNavigate()

    const onKeyPress = e => {
        if (e.charCode === 13) {
            let bulls = 0
            let cows = 0
            const numbers = new Array(10)
            for (let i=0; i<33; i++){
              numbers[i] = 0
            }
            for (let i = 0; i<command.password.length; i++) {
              const s = command.password.toLowerCase().charCodeAt(i) - 1072
              const g = playerPassword.title.toLowerCase().charCodeAt(i) - 1072
              if (s === g) bulls++
              else { 
                if (numbers[s] < 0) cows++
                if (numbers[g] > 0) cows++
                numbers[s] ++
                numbers[g] --
              }
            }
            let result = {bulls: bulls, cows: cows}

            if(command.password.length === bulls) {
                navigate('/PlayerTerminalPage/'+ terminal +'/TerminalCommand/' + command.title, {state: {command: command, terminal: terminal}})
            }
            if(playerPassword.title.toLowerCase() === 'назад') {
              navigate(-1)
          }
            setBullsCows(result)
            
        }
    }

    return(
        <div>
            <strong>{command.title}</strong><br/>
            Осуществляется взлом <br/>
            <text> Необходимо подобрать слово-пароль из {command.password.length} букв методом перебора. Система  сообщает в ответ, сколько букв угадано без совпадения с их позициями в пароле (то есть количество коров) и сколько угадано вплоть до позиции в пароле (то есть количество быков). Количество попыток не ограничено. Для возврата введите команду 'назад'</text><br/>
            Введите пароль
            <MyInput
            name = "password"
            value = {playerPassword.title}
            onChange = {e => setPlayerPassword({...playerPassword, title: e.target.value})}
            onKeyPress = {onKeyPress}
            type = "text" 
            placeholder='Пароль'/>
            Быки: {bullsCows.bulls} Коровы:{bullsCows.cows} 
        </div>
    )
}

export {PlayerHackerTerminalPage};