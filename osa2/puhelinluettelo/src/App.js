import React, { useState } from 'react'
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchString, setNewSearchString ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if(newName !== ""){
            if(persons.map(person => person.name).indexOf(newName) === -1){
                const newPerson = { name: newName, number: newNumber }
                setPersons(persons.concat(newPerson))
                setNewName("")
                setNewNumber("")
            } else {
                alert(`${newName} on jo luettelossa`)
            }
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchStringChange = (event) => {
        setNewSearchString(event.target.value)
    }

    const personsToShow = searchString !== ""
        ? persons.filter(person => person.name.match(RegExp(searchString, "i")) !== null)
        : persons

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
            <h2>Lisää uusi</h2>
            <PersonForm
                newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
            <h2>Numerot</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App
