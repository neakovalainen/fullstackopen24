import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1231244" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App
