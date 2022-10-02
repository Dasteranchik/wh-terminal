import React, { useMemo, useState } from 'react';
import TerminalForm from './TerminalForm';
import TerminalList from './TerminalList';
import axios from 'axios';
import MyButton from './UI/button/MyButton';
//import './styles/App.css'

function MainPage() {
  const [terminals, setTerminal] = useState([
    { id: '', 
      title: '', 
      description: '', 
      commands: [{
        title: '', 
        description: '', 
        password: '', 
        hackingCommand: '',
        flagPassword: Boolean,
        flag: Boolean,
        commands: [{
          title: '', 
          description: '',
          flag: Boolean
        }]
      }]
    }
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedTerminals = useMemo( () => {
    if(filter.sort){
      return [...terminals].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return terminals
  }, [filter.sort, terminals])

  const sortedAndSearchedTerminals = useMemo(() => {
    return sortedTerminals.filter(terminal => terminal.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedTerminals])

  const returnTerminals = (() => {
    const fetchData = async () => {
      const result = await axios.post(
        'http://localhost:5001/api/ReturnAllTerminals'
      )
      setTerminal(result.data)
    };
    fetchData();
  }

  )

  function createPost (newPost) {
    setTerminal([...terminals, newPost])
  }

  function removePost (terminal) {
    setTerminal(terminals.filter(p => p.id !== terminal.id))
  }

  return (
    <div className = "MainPage">
      <TerminalForm create = {createPost}/>
      <hr style = {{margin: '15px 0'}}/>
      {/* <TerminalFilter
        filter = {filter}
        setFilter = {setFilter}
      /> */}
      <MyButton onClick = {returnTerminals} > Обновить </MyButton>
      {sortedAndSearchedTerminals.length !== 0
        ? <TerminalList remove = {removePost} terminals={sortedAndSearchedTerminals} title='Список терминалов' />
        : <h1 style = {{textAlign: 'center'}}>
            Терминалов нет
          </h1>
      }
    </div>
  );
}

export {MainPage};
