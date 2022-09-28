import axios from 'axios'

export const addedTerminal = async (title, description, commands) => {
    try{
        const response = await axios.post('http://localhost:5001/api/AdminCreateTerminalPage', {
            title,
            description,
            commands
        })
        alert(response.data.message)
    } catch (e) {
        alert (e)
    }
    

}