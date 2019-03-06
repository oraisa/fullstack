import React from "react"

const NewBlogForm = ({title, author, url, createBlog}) => (
    <form onSubmit={createBlog}>
        <div>
            <label htmlFor="title">Title: </label>
            <input id="title" {...title.input}/>
        </div>
        <div>
            <label htmlFor="author">Author: </label>
            <input id="author" {...author.input}/>
        </div>
        <div>
            <label htmlFor="url">Url: </label>
            <input id="url" {...url.input}/>
        </div>
        <button id="createBlog" type="submit">Create</button>
    </form>
)

export default NewBlogForm
