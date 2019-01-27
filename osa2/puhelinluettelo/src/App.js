import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonService from "./services/PersonService"

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchString, setNewSearchString ] = useState('')

    useEffect(() => { PersonService.getAll().then(setPersons) }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if(newName !== ""){
            const personIndex = persons.map(person => person.name).indexOf(newName)
            if(personIndex === -1){
                const newPerson = { name: newName, number: newNumber }
                PersonService.create(newPerson).then(createdPerson => {
                    setPersons(persons.concat(createdPerson))
                    setNewName("")
                    setNewNumber("")
                })
            } else {
                replaceNumber(persons[personIndex], newNumber)
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

    const deletePerson = (personToDel) => {
        if(window.confirm(`Poistetaanko ${personToDel.name}?`)){
            PersonService.del(personToDel).then(() => {
                setPersons(persons.filter(person => person.id !== personToDel.id))
            })
        }
    }

    const replaceNumber = (person, newNumber) => {
        if(window.confirm(`${person.name} on jo luoettelossa. Korvataanko vanha numero uudella?`)){
            PersonService.replace(person, { ...person, number: newNumber })
                .then(replacedPerson => {
                    setPersons(persons.map(person =>
                        person.id !== replacedPerson.id ? person : replacedPerson)
                    )
                    setNewName("")
                    setNewNumber("")
                })
        }
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
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App
