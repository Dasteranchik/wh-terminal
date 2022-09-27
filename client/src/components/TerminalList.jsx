import React from "react";
import TerminalItem from "./TerminalItem";

const TerminalList = ({terminals, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {terminals.map((terminal, index) =>
                <TerminalItem remove = {remove} number = {index + 1} terminal={terminal} key = {terminal.id}/>
            )}
        </div>
    )

}


export default TerminalList;