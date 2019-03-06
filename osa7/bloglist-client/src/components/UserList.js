import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const UserList = ({users}) => {
    return <table>
        <thead>
            <tr>
                <td></td>
                <td><strong>blogs created</strong></td>
            </tr>
        </thead>
        <tbody>
            {users.map(user => <User key={user.id} userId={user.id} name={user.name} blogs={user.blogs.length} />)}
        </tbody>
    </table>
}

const User = ({name, blogs, userId}) => (
    <tr>
        <td><Link to={`/users/${userId}`}>{name}</Link></td>
        <td>{blogs}</td>
    </tr>
)

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(UserList)
