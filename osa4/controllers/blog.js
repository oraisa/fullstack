const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", (request, response, next) => {
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
    }).catch(error => next(error))
})

blogRouter.post("/", (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    blog.save().then(result => {
        response.status(201).json(result.toJSON())
    }).catch(error => next(error))
})

module.exports = blogRouter
