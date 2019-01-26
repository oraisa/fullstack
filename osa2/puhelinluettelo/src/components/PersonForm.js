import React from "react"

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => (
    <form onSubmit={addPerson}>
        nimi: <input value={newName} onChange={handleNameChange}/>
        <br />
        numero: <input value={newNumber} onChange={handleNumberChange}/>
        <br />
        <button type="submit">lisää</button>
    </form>
)

export default PersonForm
