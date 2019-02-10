const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const blogLists = require("./blog_lists")
const helper = require("./helper")
const jwt = require("jsonwebtoken")

const api = supertest(app)

let tokenWithBlogs = ""
let tokenWithoutBlogs = ""

beforeEach(async () => {
    await User.deleteMany({})
    const user1 = new User({ username: "root", passwordHash: "sekret" })
    await user1.save()
    const user2 = new User({ username: "admin", passwordHash: "sekret" })
    await user2.save()

    const users = await helper.usersInDb()

    await Blog.deleteMany({})
    await Promise.all(blogLists.biggerList.map(blog => new Blog({
        ...blog,
        user: users[0].id
    }).save()))

    const userForToken = {
        username: users[0].username,
        id: users[0].id,
    }
    tokenWithBlogs = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`
    tokenWithoutBlogs = `Bearer ${jwt.sign({ username: users[1].username, id: users[1].id }, process.env.SECRET)}`
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
            .set("Authorization", tokenWithBlogs)
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
            .set({ Authorization: tokenWithBlogs })
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
        await api.post("/api/blogs")
            .set({ Authorization: tokenWithBlogs })
            .send(newBlog)
            .expect(400)
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length)
    })

    test("a blog with no url is not added", async () => {
        const newBlog = {
            title: "Hello new Blog",
            author: "Node.js",
        }
        await api.post("/api/blogs")
            .set({ Authorization: tokenWithBlogs })
            .send(newBlog)
            .expect(400)
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogLists.biggerList.length)
    })
})

describe("deleting a blog", () => {
    test("blogs can be deleted", async () => {
        const response = await api.get("/api/blogs")
        const blogToDelete = response.body[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: tokenWithBlogs })
            .expect(204)
        const responseAfterDelete = await api.get("/api/blogs")
        const titles = responseAfterDelete.body.map(blog => blog.title)
        expect(responseAfterDelete.body.length).toBe(response.body.length - 1)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test("user cannot delete other blogs", async () => {
        const response = await api.get("/api/blogs")
        const blogToDelete = response.body[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: tokenWithoutBlogs })
            .expect(401)
        const responseAfterDelete = await api.get("/api/blogs")
        expect(responseAfterDelete.body.length).toBe(response.body.length)
    })
})

describe("updating a blog", () => {
    test("likes on a blog can be changed", async () => {
        const response = await api.get("/api/blogs")
        const blogToUpdate = response.body[0]
        const updatedBlog = {
            likes: blogToUpdate.likes + 3
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .set({ Authorization: tokenWithBlogs })
            .send(updatedBlog)
            .expect(200)
        const responseAfterUpdate = await api.get("/api/blogs")
        const likesAfterUpdate = responseAfterUpdate.body.find(blog => blog.id === blogToUpdate.id).likes
        expect(likesAfterUpdate).toBe(blogToUpdate.likes + 3)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
