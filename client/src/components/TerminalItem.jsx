import React from "react";
import MyButton from "./UI/button/MyButton";
import { Routes, Route, Link} from 'react-router-dom'
import { deletedTerminal } from "./utils/input/input";
import { PlayerStartedTerminalPage } from "./PlayerStartedTerminalPage";

const TerminalItem = (props) => {

    return (
        <div className="terminal">
            <div className="post__content">
                <strong>{props.number}. {props.terminal.title}</strong>
                <div>
                    {props.terminal.description}
                </div>
                {props.terminal.commands.map((input, index) => {
                    return(
                        <div key = {index}>
                            <hr style = {{margin: '10px 0'}}/>
                            Название команды: {input.title} <br/>
                            Описание команды: {input.description}<br/>
                            Пароль: {input.password}<br/>
                            {input.commands.map((input, index) => {
                            return(
                                <div style ={{marginLeft: '50px'}} key = {index}>
                                    <hr style = {{margin: '10px 0'}}/>
                                    Название субкоманды: {input.title} <br/>
                                    Описание субкоманды: {input.description}<br/>
                                    Пароль: {input.password}<br/>
                                </div>
                            )}
                            
                        )}
                        </div>
                    )}
                )}
            </div>
            <div className="post__btns">
                <MyButton onClick = {() => deletedTerminal(props.terminal.title)}>
                    Удалить
                </MyButton>
                <MyButton> <Link to ={'/PlayerStartedTerminalPage/' + props.terminal.title} state={{ terminal: props.terminal }}> Открыть </Link> </MyButton>
                <Routes>
                    <Route path='/PlayerStartedTerminalPage/:title' element = {<PlayerStartedTerminalPage />} />
                </Routes>
            </div>
            
        </div>
    );
};

export default TerminalItem;