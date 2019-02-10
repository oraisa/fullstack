const User = require("../models/user")
const helper = require("./helper")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: "root", passwordHash: "sekret" })
    await user.save()
})

describe("getting users", async () => {
    test("users are returned as json", async () => {
        await api.get("/api/users").expect(200).expect("Content-Type", /application\/json/)
    })

    test("all users are returned", async () => {
        const response = await api.get("/api/users")
        expect(response.body.length).toBe(1)
    })

    test("returned users don't contain password hash", async () => {
        const response = await api.get("/api/users")
        expect(response.body[0].passwordHash).toBeUndefined()
    })
})

describe("creating users", async () => {
    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("cannot create user with no username", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            name: "Matti Luukkainen",
            password: "salainen",
        }
        const response = await api.post("/api/users").send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        expect(response.body.error).toContain("username")
        expect(response.body.error).toContain("required")
    })

    test("cannot create user with no password", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
        }
        const response = await api.post("/api/users").send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        expect(response.body.error).toContain("password")
        expect(response.body.error).toContain("required")
    })

    test("cannot create user with 2 character username", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "ml",
            name: "Matti Luukkainen",
            password: "salainen",
        }
        const response = await api.post("/api/users").send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        expect(response.body.error).toContain("username")
        expect(response.body.error).toContain("minimum")
        expect(response.body.error).toContain("3")
    })

    test("cannot create user with 2 character password", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "sa",
        }
        const response = await api.post("/api/users").send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        expect(response.body.error).toContain("password")
        expect(response.body.error).toContain("minimum")
        expect(response.body.error).toContain("3")
    })

    test("cannot create user with duplicate username", async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "root",
            name: "0",
            password: "root",
        }
        const response = await api.post("/api/users").send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        expect(response.body.error).toContain("username")
        expect(response.body.error).toContain("unique")
    })
})

afterAll(() => {
    mongoose.connection.close()
})
