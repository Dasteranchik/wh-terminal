import { useNavigate } from "react-router";
import React, {useState, useEffect} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from './UI/button/MyButton';
import axios from "axios";
import { URL_LOCALHOST } from "../utils/constants";

const AdminEditTerminalPage = () => {
    const [terminal, setTerminal] = useState(null)
    const [commands, setCommands] = useState(null)
    const navigate = useNavigate()
    const url = URL_LOCALHOST

    useEffect(() => {
      axios.post(url + '/api/ReturnFindOneTerminal', {
        title: decodeURI(window.location.href.split('Page/')[1])
      }).then(response => setTerminal(response.data))
      axios.post(url + '/api/ReturnFindOneTerminal', {
        title: decodeURI(window.location.href.split('Page/')[1])
      }).then(response => setCommands(response.data.commands))
    }, []); 

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

    const editTerminal = async () => {
        terminal.commands = commands
        axios.post(url + '/api/AdminEditTerminalPage', {
        terminals: terminal
        })
        navigate(-1)
    }

    const handlerSubCommmandsFlag = (index, subIndex, e) => {
        let data = [...commands];
        data[index].commands[subIndex][e.target.name] = !data[index].commands[subIndex][e.target.name];
        setCommands(data);
    }

    return ( terminal ?
        <form>
            <MyInput 
                value = {terminal.title}
                onChange = {e => setTerminal({...terminal, title: e.target.value})}
                type = "text" 
                placeholder='???????????????? ??????????????????'/>
            <MyInput 
                value = {terminal.description}
                onChange = {e => setTerminal({...terminal, description: e.target.value})}
                type = "text" 
                placeholder='???????????????? ??????????????????'/>
            {commands.map((input, index) => {
                return(
                    <div key = {index}>
                        <hr style = {{margin: '10px 0'}}/>
                        <MyInput 
                            name = "title"
                            value = {input.title}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='???????????????????????? ??????????????'/>
                        <MyInput 
                            name = "description"
                            value = {input.description}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='???????????????????? ???? ??????????????'/>
                        <MyInput
                            name = "password"
                            value = {input.password}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='????????????'/>
                            <MyInput
                            name = "hackingCommand"
                            value = {input.hackingCommand}
                            onChange = {e => handlerCommmands(index, e)}
                            type = "text" 
                            placeholder='???????????? ?????? ????????????'/>
                        <MyButton onClick={e => removeCommand(index, e)}> ?????????????? ?????????????? </MyButton>
                        {input.commands.map((subInput, subIndex) => {
                            return(
                                <div style ={{marginLeft: '50px'}} key = {subIndex}>
                                    <hr style = {{margin: '10px 0'}}/>
                                    <MyInput 
                                        name = "title"
                                        value = {subInput.title}
                                        onChange = {e => handlerSubCommmands(index, subIndex, e)}
                                        type = "text" 
                                        placeholder='???????????????????????? ????????????????????'/>
                                    <MyInput 
                                        name = "description"
                                        value = {subInput.description}
                                        onChange = {e => handlerSubCommmands(index, subIndex, e)}
                                        type = "text" 
                                        placeholder='???????????????????? ???? ????????????????????'/>
                                    <input 
                                        name="flag" 
                                        type="checkbox" 
                                        value = {subInput.flag}
                                        checked={subInput.flag}
                                        onChange = {e => handlerSubCommmandsFlag(index, subIndex, e)}
                                        label='???????????? ????????????????????'/> ???????????? ???????????????????? <br/>
                                    <MyButton onClick={e => removeSubCommand(index, subIndex, e)}> ?????????????? ???????????????????? </MyButton>
                                </div>
                            )
                            
                        })}
                        <MyButton onClick = {e => addSubComand(index, e)} > ???????????????? ???????????????????? </MyButton>
                    </div>
                )
                
            })}
            <MyButton onClick = {addComand} > ???????????????? ?????????????? </MyButton>
            <hr style = {{margin: '10px 0'}}/>
            <MyButton onClick = {() => editTerminal()} > ?????????????????? ?????????????????? </MyButton>
        </form> :
        <div>
            ???????????????? ????????????????<br/>
            <MyButton onClick = {() => navigate(-1)} > ?????????? </MyButton><br/>
        </div>
    )
}
export {AdminEditTerminalPage};