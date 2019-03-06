const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

blogRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
        response.json(blogs.map(blog => blog.toJSON()))
    } catch(error){
        next(error)
    }
})

blogRouter.post("/", async (request, response, next) => {
    const body = request.body
    const token = request.token
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json({ ...savedBlog.toJSON(), user: {
            username: user.username, name: user.name, id: user.id
        } })
    } catch(error){
        next(error)
    }
})

blogRouter.delete("/:id", async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!request.token || !decodedToken.id){
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        if(user._id.toString() === blog.user.toString()){
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: "blog was created by another user" })
        }
    } catch(error){
        next(error)
    }
})

blogRouter.put("/:id", async (request, response, next) => {
    const blog = {
        likes: request.body.likes
    }
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
        if(updatedBlog){
            const user = await User.findById(updatedBlog.user)
            response.json({ ...updatedBlog.toJSON(), user: {
                username: user.username, name: user.name, id: user.id
            } })
        } else {
            response.status(404).end()
        }
    } catch(error){
        next(error)
    }
})

blogRouter.post("/:id/comments", async (request, response, next) => {
    const comment = request.body.comment
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
            $push: { comments: comment }
        }, { new: true, runValidators: true })
        if(!updatedBlog){
            return response.status(404).end()
        }
        const user = await User.findById(updatedBlog.user)
        response.status(201).json({ ...updatedBlog.toJSON(), user: {
            username: user.username, name: user.name, id: user.id
        } })
    } catch(error){
        next(error)
    }
})

module.exports = blogRouter
