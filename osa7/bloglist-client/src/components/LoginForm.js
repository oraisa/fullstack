import React from "react"

const LoginForm = ({ username, password, handleLogin }) => (
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Username: </label>
            <input id="username" {...username.input}/>
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input id="password" {...password.input}/>
        </div>
        <button type="submit">Login</button>
    </form>
)

export default LoginForm
