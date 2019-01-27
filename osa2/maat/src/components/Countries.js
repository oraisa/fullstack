import React from "react"

const CountryFull = ({country}) => (
    <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
    </div>
)

const CountryPartial = ({country, showCountry}) => (
    <div>
        <label>{country.name} </label>
        <button onClick={() => showCountry(country.name)}>Show</button>
    </div>
)

const Countries = ({countries, showCountry}) => {
    if(countries.length > 0){
        if(countries.length <= 10){
            if(countries.length === 1){
                return (<CountryFull country={countries[0]} />)
            } else {
                return (
                    <div>
                        {countries.map(country =>
                            <CountryPartial
                                key={country.alpha3Code}
                                country={country}
                                showCountry={showCountry}
                            />
                        )}
                    </div>
                )
            }
        } else {
            return (<div>Too many countries, specify another filter</div>)
        }
    } else {
        return (<div>No countries match</div>)
    }
}

export default Countries
