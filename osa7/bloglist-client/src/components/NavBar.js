import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/loginReducer"

const NavBar = ({user, logout}) => {
    const padding = { margin: 3 }
    return <div>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/">blogs</Link>
        {user.name} logged in
        <button style={padding} onClick={logout}>logout</button>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
