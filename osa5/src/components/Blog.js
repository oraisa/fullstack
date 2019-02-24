import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({blog, handleLike, handleDelete, showRemove}) => {
    const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenExpanded = {
        display: expanded ? "" : "none"
    }

    return (
        <div className="blog" style={blogStyle} >
            <div onClick={() => setExpanded(!expanded)} className="blogTitleAuthor">
                {blog.title} {blog.author}
            </div>
            <div style={showWhenExpanded} className="restOfBlog">
                <div>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div>
                    {blog.likes} likes
                    <button onClick={() => handleLike()}>Like</button>
                </div>
                <div>
                Added by {blog.user.name}
                </div>
                <div style={{display: showRemove ? "" : "none"}}>
                    <button onClick={handleDelete}>Remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog
