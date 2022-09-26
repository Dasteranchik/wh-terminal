import React from "react";
import TerminalItem from "./TerminalItem";

const TerminalList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((terminal, index) =>
                <TerminalItem remove = {remove} number = {index + 1} terminal={terminal} key = {terminal.id}/>
            )}
        </div>
    )

}


export default TerminalList;