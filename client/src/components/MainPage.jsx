import React, { useMemo, useState } from 'react';
import TerminalFilter from './TerminalFilter';
import TerminalForm from './TerminalForm';
import TerminalList from './TerminalList';
//import './styles/App.css'

function MainPage() {
  const [terminals, setTerminal] = useState([
    { id: 1, title: 'JS1', description: 'DC1' },
    { id: 2, title: 'JS2', description: 'DC2' }
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
