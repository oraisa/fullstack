import blogService from "../services/blogs"

const reducer = (state = [], action) => {
    switch(action.type){
    case "INIT_BLOGS":
        return action.data
    case "UPDATE":
        return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
    case "DELETE":
        return state.filter(blog => blog.id !== action.blog.id)
    case "CREATE":
        return state.concat(action.blog)
    default: return state
    }
}

export const initBlogs = () => async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
        type: "INIT_BLOGS",
        data: blogs
    })
}

export const likeBlog = (blog) => async dispatch => {
    const updatedBlog = await blogService.like(blog)
    dispatch({
        type: "UPDATE",
        blog: updatedBlog
    })
}

export const deleteBlog = (blog) => async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
        type: "DELETE",
        blog: blog
    })
}

export const createBlog = (blog) => async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
        type: "CREATE",
        blog: createdBlog
    })
}

export default reducer
