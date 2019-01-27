
import React from "react"

const Person = ({person, deletePerson}) => (
    <div>
        {person.name}: {person.number}
        <button onClick={() => deletePerson(person)}>Poista</button>
    </div>
)

const Persons = ({persons, deletePerson}) => (
    <div>
        {persons.map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
        )}
    </div>
)

export default Persons
