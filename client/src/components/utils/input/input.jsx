import axios from 'axios'
import { URL_LOCALHOST } from '../../../utils/constants'

const url = URL_LOCALHOST

export const addedTerminal = async (title, description, commands) => {
    try{
        const response = await axios.post(url + '/api/AdminCreateTerminalPage', {
            title,
            description,
            commands
        })
        alert(response.data.message)
    } catch (e) {
        alert (e)
    }
}

export const deletedTerminal = async (title) => {
    try{
        const response = await axios.post(url + '/api/DeleteTerminal', {
            title
        })
        alert(response.data.message)
    } catch (e) {
        alert (e)
    }
}

export const getTerminal = async (title) => {
    try{
        const response = await axios.post(url + '/api/ReturnFindOneTerminal', {
            title: title
        })
        return response.data
    } catch (e) {
        alert (e)
    }
}