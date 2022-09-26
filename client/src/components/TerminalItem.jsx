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