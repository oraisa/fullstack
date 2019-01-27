import React, { useState, useEffect } from 'react'
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
    const [searchString, setSearchString] = useState("")
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value)
    }

    const countriesToShow = searchString === "" ? countries
        : countries.filter(country =>
            country.name.match(RegExp(searchString, "i"))
        )

    return (
        <div>
            <label>Find countries: </label>
            <input value={searchString} onChange={handleSearchStringChange}/>
            <Countries countries={countriesToShow} showCountry={setSearchString} />
        </div>
    )
}

export default App
