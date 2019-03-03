import React from "react"
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        const filterValue = event.target.value
        props.store.dispatch(filter(filterValue))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter
