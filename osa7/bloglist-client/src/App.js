import React, { useState, useEffect } from "react"
import { useField } from "./hooks"
import { connect } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import UserList from "./components/UserList"
import User from "./components/User"
import { initBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer"
import { notify, notifyError } from "./reducers/notificationReducer"
import { login, logout, initUser } from "./reducers/loginReducer"
import { initUsers } from "./reducers/userReducer"
import "./index.css"

const App = (props) => {
    const username = useField("text")
    const password = useField("password")
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    useEffect(() => {
        props.initBlogs()
    }, [])

    useEffect(() => {
        props.initUser()
    }, [])

    useEffect(() => {
        props.initUsers()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            props.login({ username: username.value, password: password.value }, () => {
                props.notifyError("Wrong username or password")
            })
            username.reset()
            password.reset()
        } catch(error){
            props.notifyError("Wrong username or password")
            username.reset()
            password.reset()
        }
    }

    const handleLogout = () => {
        props.logout()
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try{
            props.createBlog({
                author: author.value,
                title: title.value,
                url: url.value,
            })
            props.notify(`${title.value} created`)
            title.reset()
            author.reset()
            url.reset()
            setCreateBlogVisible(false)
        } catch(error){
            props.notifyError(error.response.data.error)
            console.log(error)
        }
    }

    if(props.user === null){
        return <div>
            <Notification notificationClass="error"/>
            <Notification notificationClass="notification"/>
            <LoginForm
                username={username} password={password}
                handleLogin={handleLogin}
            />
        </div>
    } else {
        const showWhenVisible = { display: createBlogVisible ? "" : "none" }
        const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
        return (
            <BrowserRouter>
                <div>
                    <Notification notificationClass="error"/>
                    <Notification notificationClass="notification"/>
                    <h2>Blogs</h2>
                    <p>{props.user.name} logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Route exact path="/" render={() =>
                        <div>
                            <h2>Create new blog</h2>
                            <div style={hideWhenVisible}>
                                <button onClick={() => setCreateBlogVisible(true)}>Create</button>
                            </div>
                            <div style={showWhenVisible}>
                                <NewBlogForm
                                    title={title} author={author} url={url}
                                    createBlog={handleCreateBlog}
                                />
                                <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
                            </div>
                            <h2>Existing blogs</h2>
                            <BlogList />
                        </div>
                    }/>
                    <Route exact path="/users" render={() =>
                        <UserList />
                    }/>
                    <Route exact path="/users/:id" render={({match}) =>
                        <User user={props.users.find(u => u.id === match.params.id)}/>
                    }/>
                    <Route exact path="/blogs/:id" render={({match}) =>
                        <Blog blog={props.blogs.find(b => b.id === match.params.id)}/>
                    }/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    blogs: state.blogs
})

export default connect(mapStateToProps, {
    initBlogs, createBlog, likeBlog, deleteBlog,
    notify, notifyError,
    login, logout, initUser,
    initUsers
})(App)
