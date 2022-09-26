import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const TerminalForm = ({create}) => {

    const [terminal, setTerminal] = useState({title: '', description: '', command: { id: '', title: ''}})

    function addNewTerminal (e) {
        e.preventDefault()
        const newTerminal ={
            ...terminal, id:uuidv4()
        }
        create(newTerminal)
        setTerminal({title:'', description:''})
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
            <MyButton onClick = {addNewTerminal} > Добавить терминал</MyButton>
        </form>
    )
}

export default TerminalForm;