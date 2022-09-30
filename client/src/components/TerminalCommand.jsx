import { useLocation } from "react-router"


const TerminalCommand = () => {
    const location = useLocation()
    const command = location.state.command
    return(
        <div>
            <strong>{command.title}</strong>
                    <div>
                        {command.description}
                    </div>
                    {command.commands.map((input, index) => {
                        return(
                            <div key = {index}>
                                <hr style = {{margin: '10px 0'}}/>
                                Название команды: {input.title} <br/>
                                Описание команды: {input.description}<br/>
                                Пароль: {input.password}<br/>                                
                            </div>
                        )}
                    )}
        </div>
    )
}

export {TerminalCommand};