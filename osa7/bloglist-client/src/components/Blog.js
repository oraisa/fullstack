import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"

const Blog = ({blog, likeBlog, deleteBlog, user, history, notify}) => {
    if(blog === undefined){
        return null
    }

    const handleDelete = () => {
        deleteBlog(blog)
        history.push("/")
        notify(`${blog.title} deleted`)
    }

    const handleLike = () => {
        likeBlog(blog)
        notify(`${blog.title} liked`)
    }

    return <div>
        <h1>{blog.title}</h1>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
            {blog.likes} likes
            <button onClick={handleLike}>like</button>
        </div>
        <div>
            added by {blog.user.name}
        </div>
        <div>
            {user.id === blog.user.id &&
                <button onClick={handleDelete}>remove</button>
            }
        </div>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    likeBlog, deleteBlog, notify
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
