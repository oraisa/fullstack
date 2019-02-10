const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const blogLists = require("./blog_lists")

const api = supertest(app)

beforeEach(async () => {
    await Blog.remove({})
    await Promise.all(blogLists.biggerList.map(blog => new Blog(blog).save()))
})

describe("getting blogs", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length)
    })
})

describe("blog id", () => {
    test("blog id is in id field", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })

    test("blog id is not in _id field", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0]._id).toBeUndefined()
    })
})
describe("adding a blog", () => {
    test("a valid blog can be added", async () => {
        const newBlog = {
            title: "Hello new Blog",
            author: "Node.js",
            url: "localhost",
            likes: 0
        }
        await api.post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length + 1)
        const titles = response.body.map(json => json.title)
        expect(titles).toContain(newBlog.title)
    })

    test("when adding a blog with no likes, it is added with 0 likes", async () => {
        const newBlog = {
            title: "Hello new Blog",
            author: "Node.js",
            url: "localhost",
        }
        await api.post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length + 1)
        const titles = response.body.map(json => json.title)
        expect(titles).toContain(newBlog.title)
        const titlesWith0Likes = response.body.filter(blog => blog.likes === 0).map(blog => blog.title)
        expect(titlesWith0Likes).toContain(newBlog.title)
    })

    test("a blog with no title is not added", async () => {
        const newBlog = {
            author: "Node.js",
            url: "localhost",
        }
        await api.post("/api/blogs").send(newBlog).expect(400)
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length)
    })

    test("a blog with no url is not added", async () => {
        const newBlog = {
            title: "Hello new Blog",
            author: "Node.js",
        }
        await api.post("/api/blogs").send(newBlog).expect(400)
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length)
    })
})

describe("deleting a blog", () => {
    test("blogs can be deleted", async () => {
        const response = await api.get("/api/blogs")
        const blogToDelete = response.body[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
        const responseAfterDelete = await api.get("/api/blogs")
        const titles = responseAfterDelete.body.map(blog => blog.title)
        expect(responseAfterDelete.body.length).toBe(response.body.length - 1)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe("updating a blog", () => {
    test("likes on a blog can be changed", async () => {
        const response = await api.get("/api/blogs")
        const blogToUpdate = response.body[0]
        const updatedBlog = {
            likes: blogToUpdate.likes + 3
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
        const responseAfterUpdate = await api.get("/api/blogs")
        const likesAfterUpdate = responseAfterUpdate.body.find(blog => blog.id === blogToUpdate.id).likes
        expect(likesAfterUpdate).toBe(blogToUpdate.likes + 3)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
