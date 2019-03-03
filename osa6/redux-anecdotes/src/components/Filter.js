import React from "react"
import { connect } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = ({filter}) => {
    const handleChange = (event) => {
        const filterValue = event.target.value
        filter(filterValue)
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

const mapDispatchToProps = {
    filter
}

export default connect(null, mapDispatchToProps)(Filter)
