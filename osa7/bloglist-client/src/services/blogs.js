
import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async blog => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const like = async blog => {
    const config = {
        headers: { Authorization: token }
    }
    const updatedBlog = {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
    return response.data
}

const comment = async (blog, comment) => {
    const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment })
    return response.data
}

const deleteBlog = async blog => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, setToken, create, like, comment, deleteBlog }
