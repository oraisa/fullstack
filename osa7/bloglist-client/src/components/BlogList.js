import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const BlogList = ({blogs}) => {
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    return (
        <div>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )
}

const Blog = ({blog}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className="blog" style={blogStyle} >
            <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => ({
    blogs: state.blogs
})

export default connect(mapStateToProps)(BlogList)
