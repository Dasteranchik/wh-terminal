import React from "react";
import MyButton from "./UI/button/MyButton";


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
                    </div>

                )
            })}
            </div>
            <div className="post__btns">
                <MyButton onClick = {() => props.remove(props.terminal)}>
                    Удалить
                </MyButton>
            </div>
            
        </div>
    );
};

export default TerminalItem;