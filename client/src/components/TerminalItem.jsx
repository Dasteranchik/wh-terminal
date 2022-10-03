import React from "react";
import MyButton from "./UI/button/MyButton";
import { Routes, Route, Link} from 'react-router-dom'
import { deletedTerminal } from "./utils/input/input";
import { PlayerTerminalPage } from "./PlayerTerminalPage";

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
                            Пароль для хакера: {input.hackingCommand}
                            {input.commands.map((input, index) => {
                            return(
                                <div style ={{marginLeft: '50px'}} key = {index}>
                                    <hr style = {{margin: '10px 0'}}/>
                                    Название субкоманды: {input.title} <br/>
                                    Описание субкоманды: {input.description}<br/>
                                    Флаг: {input.flag ? 'Вкл' : 'Выкл'}
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
                <MyButton> <Link to ={'/PlayerTerminalPage/' + props.terminal.title} state={{ terminal: props.terminal }}> Открыть </Link> </MyButton>
                <MyButton> <Link to ={'/AdminEditTerminalPage/' + props.terminal.title} state={{ terminal: props.terminal }}> Редактировать </Link> </MyButton>
                <Routes>
                    <Route path='/PlayerTerminalPage/:title' element = {<PlayerTerminalPage />} />
                </Routes>
            </div>
            
        </div>
    );
};

export default TerminalItem;