import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1231244" },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')

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
    console.log({exists})
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
      <div>
        filter shown with
        <input
        value={currentFilter}
        onChange={addFiltering}
        />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newName} 
          onChange={handleNameAddition}
          />
        </div>
        <div>
          number:  
          <input 
          value={newNumber}
          onChange={handleNumberAddition}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(handleFiltering).map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App
