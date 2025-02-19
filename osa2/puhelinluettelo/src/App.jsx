import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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
        <li key={person.name}>{person.name} {person.number}
        <form onSubmit={(event) => props.personDeletion(event, person.id)}>
          <button type="submit">delete</button>
        </form>
        </li>
      )}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [confirmationMessage, setconfirmationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    const exists = persons.find(person => person.name === newName)
    console.log(exists)
    if (exists) {
      window.confirm("Name already exists, want to replace the old number?")
      personService
      .update(exists.id, personToAdd)
      .then(updatedPerson => {
        setconfirmationMessage(
          `The number for '${updatedPerson.name}' has been changed`
        )
        setTimeout(() => {
          setconfirmationMessage(null)
        }, 3000)
        setPersons(persons.map(person => person.name == updatedPerson.name ? updatedPerson : person))
        setNewName('')
        setNewNumber('')
      })
    }
    else if (newName && newNumber) {
    personService
      .create(personToAdd)
      .then(returnedPerson => {
        setconfirmationMessage(
          'A new person has been added!'
        )
        setTimeout(() => {
          setconfirmationMessage(null)
        }, 3000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    else {
      window.alert("Add a name and a number!!!!")
    }
  }

  const handleNameAddition = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    setNewNumber(event.target.value)
  }

  const addFiltering = (event) => {
    setCurrentFilter(event.target.value)
  }

  const handleFiltering = (value) => {
    if (value.name?.toUpperCase().includes(currentFilter.toUpperCase())) {
      return value
    }
  }

  const PersonDeletion = (event, id) => {
    event.preventDefault()
    window.confirm("Sure you want to delete?")
    personService
      .deletion(id)
      .then(() => {
        setconfirmationMessage(
          'the person was deleted successfully'
        )
        setTimeout(() => {
          setconfirmationMessage(null)
        }, 3000)
        setPersons(persons.filter(person => person.id !== id))
  })
  }
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="confirmationmessage">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmationMessage} />
      <FilterPeople currentFilter={currentFilter} addFiltering={addFiltering} />
      <PersonAddition addPerson={addPerson} newName={newName}
        handleNameAddition={handleNameAddition} newNumber={newNumber}
        handleNumberAddition={handleNumberAddition} />
      <h2>Numbers</h2>
      <Persons handleFiltering={handleFiltering} persons={persons} personDeletion={PersonDeletion} />
    </div>
  )

}

export default App
