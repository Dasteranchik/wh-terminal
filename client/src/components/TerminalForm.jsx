import React, {useState} from "react";
//import {v4 as uuidv4} from 'uuid';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { addedTerminal } from "./utils/input/input";

const TerminalForm = ({create}) => {

    const [terminal, setTerminal] = useState({title: '', description: ''})
    const [commands, setCommands] = useState([
        {title: '', description: '', password: '', commands: [{title: '', description: '', flag: Boolean(false)}]}
    ])

    const handlerCommmands = (index, e) => {
        let data = [...commands];
        data[index][e.target.name] = e.target.value;
        setCommands(data);
    }

    const handlerSubCommmands = (index, subIndex, e) => {
        let data = [...commands];
        data[index].commands[subIndex][e.target.name] = e.target.value;
        setCommands(data);
    }

    const handlerSubCommmandsFlag = (index, subIndex, e) => {
        let data = [...commands];
        data[index].commands[subIndex][e.target.name] = !data[index].commands[subIndex][e.target.name];
        setCommands(data);
    }

    const addComand = (e) => {
        e.preventDefault()
        
        let newCommand = {title: '', description: '', password: '', commands: []}

        setCommands([...commands, newCommand])
    }

    const removeCommand = (index, e) => {
        e.preventDefault()
        let data = [...commands];
        data.splice(index, 1)
        setCommands(data)
    }

    const addSubComand = (index, e) => {
        e.preventDefault()
        
        let data = [...commands];
        data[index].commands.push({title: '', description: '', password: ''})
        setCommands(data);
    }

    const removeSubCommand = (index,  subIndex,e) => {
        e.preventDefault()
        let data = [...commands];
        data[index].commands.splice(subIndex, 1)
        setCommands(data)
    }

    return (
        <form>
            <MyInput 
                value = {terminal.title}
                onChange = {e => setTerminal({...terminal, title: e.target.value})}
                type = "text" 
                placeholder='Название терминала'/>
            <MyInput 
                value = {terminal.description}
                onChange = {e => setTerminal({...terminal, description: e.target.value})}
                type = "text" 
                placeholder='Описание терминала'/>
            {commands.map((input, index) => {
                return(
                    <div key = {index}>
                        <hr style = {{margin: '10px 0'}}/>
                        <MyInput 
                            name = "title"
                            value = {input.title}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='Наименование команды'/>
                        <MyInput 
                            name = "description"
                            value = {input.description}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='Информация по команде'/>
                        <MyInput
                            name = "password"
                            value = {input.password}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='Пароль'/>
                            <MyInput
                            name = "hackingCommand"
                            value = {input.hackingCommand}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='Пароль для взлома'/>
                        <MyButton onClick={e => removeCommand(index, e)}> Удалить команду </MyButton>
                        {input.commands.map((subInput, subIndex) => {
                            return(
                                <div style ={{marginLeft: '50px'}} key = {subIndex}>
                                    <hr style = {{margin: '10px 0'}}/>
                                    <MyInput 
                                        name = "title"
                                        value = {subInput.title}
                                        onChange = {e => handlerSubCommmands(index, subIndex, e)}
                                        type = "text" 
                                        placeholder='Наименование Сабкоманды'/>
                                    <MyInput 
                                        name = "description"
                                        value = {subInput.description}
                                        onChange = {e => handlerSubCommmands(index, subIndex, e)}
                                        type = "text" 
                                        placeholder='Информация по Сабкоманде'/>
                                    <input 
                                        name="flag" 
                                        type="checkbox" 
                                        value = {subInput.flag}
                                        onChange = {e => handlerSubCommmandsFlag(index, subIndex, e)}
                                        label='Кнопка активности'/> Кнопка активности <br/>
                                    <MyButton onClick={e => removeSubCommand(index, subIndex, e)}> Удалить Сабкоманду </MyButton>
                                </div>
                            )
                            
                        })}
                        <MyButton onClick = {e => addSubComand(index, e)} > Добавить Сабкоманду </MyButton>
                    </div>
                )
                
            })}
            <MyButton onClick = {addComand} > Добавить команду </MyButton>
            <MyButton onClick = {() => addedTerminal(terminal.title, terminal.description, commands)} > Добавить терминал </MyButton> {/* addNewTerminal */}
        </form>
    )
}

export default TerminalForm;