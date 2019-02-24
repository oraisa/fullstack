import React, { useState, useEffect } from "react"
import { useField } from "./hooks"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const username = useField("text")
    const password = useField("password")
    const [user, setUser] = useState(null)
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")
    const [notificationString, setNotificationString] = useState("")
    const [errorString, setErrorString] = useState("")
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedInBlogUser = window.localStorage.getItem("loggedInBlogUser")
        if(loggedInBlogUser){
            const user = JSON.parse(loggedInBlogUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const displayNotification = (message) => {
        setNotificationString(message)
        setTimeout(() => { setNotificationString("") }, 5000)
    }

    const displayError = (message) => {
        setErrorString(message)
        setTimeout(() => { setErrorString("") }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({ username: username.value, password: password.value })
            window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            username.reset()
            password.reset()
        } catch(error){
            displayError("Wrong username or password")
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedInBlogUser")
        setUser(null)
        blogService.setToken("")
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try{
            const newBlog = await blogService.create({
                author: author.value,
                title: title.value,
                url: url.value
            })
            setBlogs(blogs.concat(newBlog))
            title.reset()
            author.reset()
            url.reset()
            displayNotification(`${newBlog.title} created`)
        } catch(error){
            displayError(error.response.data.error)
            console.log("Error creating blog", error)
        }
    }

    const handleLikeBlog = async (blogToLike) => {
        try{
            const updatedBlog = await blogService.like(blogToLike)
            setBlogs(blogs.map(blog => blog.id === blogToLike.id ? updatedBlog : blog))
            displayNotification(`${updatedBlog.title} liked`)
        } catch(error){
            displayError(error.response.data.error)
            console.log("Error liking blog", error)
        }
    }

    const handleDeleteBlog = async (blogToDelete) => {
        try{
            await blogService.deleteBlog(blogToDelete)
            setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
            displayNotification(`${blogToDelete.title} deleted`)
        } catch(error){
            displayError(error.response.data.error)
            console.log("Error deleting blog", error)
        }
    }
    if(user === null){
        return <div>
            <Notification message={errorString} notificationClass="error"/>
            <Notification message={notificationString} notificationClass="notification"/>
            <LoginForm
                username={username} password={password}
                handleLogin={handleLogin}
            />
        </div>
    } else {
        const showWhenVisible = { display: createBlogVisible ? "" : "none" }
        const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
        return (
            <div>
                <Notification message={errorString} notificationClass="error"/>
                <Notification message={notificationString} notificationClass="notification"/>
                <h2>Blogs</h2>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
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
                <Blogs
                    blogs={blogs} user={user}
                    handleLikeBlog={handleLikeBlog}
                    handleDeleteBlog={handleDeleteBlog}
                />
            </div>
        )
    }
}

const Blogs = ({blogs, handleLikeBlog, handleDeleteBlog, user}) => {
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    return (
        <div>
            {sortedBlogs.map(blog =>
                <Blog
                    key={blog.id} blog={blog}
                    handleLike={() => handleLikeBlog(blog)}
                    handleDelete={() => handleDeleteBlog(blog)}
                    showRemove={user.id === blog.user.id}
                />
            )}
        </div>
    )
}

export default App
