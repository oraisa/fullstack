import React from "react"

const Filter = ({searchString, handleSearchStringChange}) => (
    <div>
        <label> Rajaa näytettäviä nimiä: </label>
        <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
)

export default Filter
