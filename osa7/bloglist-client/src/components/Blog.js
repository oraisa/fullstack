import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"

const Blog = ({blog, likeBlog, deleteBlog, commentBlog, user, history, notify}) => {
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

    const handleComment = event => {
        event.preventDefault()
        const comment = event.target.comment.value
        commentBlog(blog, comment)
        notify(`comment ${comment} added`)
    }

    return <div>
        <h1>{blog.title}</h1>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
            {blog.likes} likes
            <button id="likeButton" onClick={handleLike}>like</button>
        </div>
        <div>
            added by {blog.user.name}
        </div>
        <div>
            {user.id === blog.user.id &&
                <button id="deleteBlogButton" onClick={handleDelete}>remove</button>
            }
        </div>
        <div>
            <h2>comments</h2>
            <form onSubmit={handleComment} >
                <input id="commentText" type="text" name="comment"/>
                <input id="commentButton" type="submit" value="add comment" />
            </form>
            <ul>
                {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
        </div>
    </div>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    likeBlog, deleteBlog, notify, commentBlog
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
