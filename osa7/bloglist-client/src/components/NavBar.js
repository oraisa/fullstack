import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/loginReducer"

const NavBar = ({user, logout}) => (
    <div>
        <Link to="/users">users</Link>
        <Link to="/">blogs</Link>
        {user.name} logged in
        <button onClick={logout}>logout</button>
    </div>
)

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
