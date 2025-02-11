import { useState, useEffect } from 'react'
import axios from 'axios'


const FilterPeople = (props) => {
  return (
    <div>
      filter shown with
      <input
        value={props.currentFilter}
        onChange={props.addFiltering}
      />
    </div>
  )
}

const PersonAddition = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
        <input
          value={props.newName}
          onChange={props.handleNameAddition}
        />
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handleNumberAddition} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.filter(props.handleFiltering).map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName && newNumber) {
      const personToAdd = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personToAdd))
      setNewName('')
      setNewNumber('')
    }
    else {
      window.alert("Add a name and a number!!!!")
    }
  }

  const handleNameAddition = (event) => {
    const exists = persons.find(entry => entry.name === event.target.value)
    console.log(persons)
    console.log({ exists })
    if (exists) {
      return (
        window.alert("Name already exists oh nooooh!")
      )
    }
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addFiltering = (event) => {
    setCurrentFilter(event.target.value)
  }

  const handleFiltering = (value) => {
    if (value.name.toUpperCase().includes(currentFilter.toUpperCase())) {
      return value
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPeople currentFilter={currentFilter} addFiltering={addFiltering} />
      <PersonAddition addPerson={addPerson} newName={newName}
        handleNameAddition={handleNameAddition} newNumber={newNumber}
        handleNumberAddition={handleNumberAddition} />
      <h2>Numbers</h2>
      <Persons handleFiltering={handleFiltering} persons={persons} />
    </div>
  )

}

export default App
