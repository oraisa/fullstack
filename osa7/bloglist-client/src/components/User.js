import React from "react"

const User = ({user}) => {
    if(user){
        console.log(user.blogs)
        return <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    } else {
        return null
    }
}

export default User
