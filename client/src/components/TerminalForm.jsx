import React, {useState, useRef} from "react";
//import {v4 as uuidv4} from 'uuid';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { addedTerminal } from "./utils/input/input";

const TerminalForm = ({create}) => {

    const submitEl = useRef(null);
    const [terminal, setTerminal] = useState({title: '', description: ''})
    const [commands, setCommmands] = useState([
        {title: '', description: '', password: '', commands: [{title: '', description: '', password: '', commands: []}]}
    ])

    const handlerCommmands = (index, e) => {
        let data = [...commands];
        data[index][e.target.name] = e.target.value;
        setCommmands(data);
    }

    const addComand = (e) => {
        e.preventDefault()
        
        let newCommand = {title: '', description: '', password: '', commands: []}

        setCommmands([...commands, newCommand])
        submitEl.current.click()
    }

    const removeCommand = (index, e) => {
        e.preventDefault()
        let data = [...commands];
        data.splice(index, 1)
        setCommmands(data)
        submitEl.current.click()
    }

    const addSubComand = (index, e) => {
        e.preventDefault()
        
        let data = [...commands];
        data[index].commands.push({title: '', description: '', password: ''})
        setCommmands(data);
        submitEl.current.click()
    }

    const removeSubCommand = (index, e) => {
        e.preventDefault()
        let data = [...commands];
        data[index].commands.splice(index, 1)
        setCommmands(data)
        submitEl.current.click()
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
                        <MyButton onClick={e => removeCommand(index, e)}> Удалить команду </MyButton>
                        {input.commands.map((input, index) => {
                            return(
                                <div style ={{marginLeft: '50px'}} key = {index}>
                                    <hr style = {{margin: '10px 0'}}/>
                                    <MyInput 
                                        name = "title"
                                        value = {input.title}
                                        
                                        type = "text" 
                                        placeholder='Наименование Сабкоманды'/>
                                    <MyInput 
                                        name = "description"
                                        value = {input.description}
                                        type = "text" 
                                        placeholder='Информация по Сабкоманде'/>
                                    <MyInput
                                        name = "password"
                                        value = {input.password}
                                        type = "text" 
                                        placeholder='Пароль'/>
                                        <MyButton onClick={e => removeSubCommand(index, e)}> Удалить Сабкоманду </MyButton>
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