import React, { useMemo, useState } from 'react';
import TerminalFilter from './TerminalFilter';
import TerminalForm from './TerminalForm';
import TerminalList from './TerminalList';
import axios from 'axios';
//import './styles/App.css'

function MainPage() {
  const [terminals, setTerminal] = useState([
    { id: 1, title: 'JS1', description: 'DC1', commands: [{title: 'Какая-то команда', description: 'Описание ради описания', password: 'праоль'}, {title: 'Шарики-фонарики', description: 'Светят заебись', password: 'изподвыподверта'}] },
    { id: 2, title: 'JS2', description: 'DC2', commands: [{title: 'qweqwe', description: 'ewe', password: 'dd'}] }
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedTerminals = useMemo( () => {
    if(filter.sort){
      return [...terminals].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return terminals
  }, [filter.sort, terminals])

  const sortedAndSearchedTerminals = useMemo(() => {
    const fetchData = async () => {
      const result = await axios.post(
        'http://localhost:5001/api/ReturnAllTerminals'
      )
      setTerminal(result.data)
    };
    fetchData();
    return sortedTerminals.filter(terminal => terminal.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedTerminals])

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
      <TerminalFilter
        filter = {filter}
        setFilter = {setFilter}
      />
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
