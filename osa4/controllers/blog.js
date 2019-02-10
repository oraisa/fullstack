const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs.map(blog => blog.toJSON()))
    } catch(error){
        next(error)
    }
})

blogRouter.post("/", async (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    try {
        const result = await blog.save()
        response.status(201).json(result.toJSON())
    } catch(error){
        next(error)
    }
})

blogRouter.delete("/:id", async (request, response, next) => {
    try{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
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
            response.json(updatedBlog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch(error){
        next(error)
    }
})

module.exports = blogRouter
