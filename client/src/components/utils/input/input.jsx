import axios from 'axios'

export const addedTerminal = async (title, description) => {
    try{
        const response = await axios.post('http://localhost:5001/api/AdminCreateTerminalPage', {
            title,
            description
        })
        alert(response.data.message)
    } catch (e) {
        alert (e)
    }
    

}