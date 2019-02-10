const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (request, response, next) => {
    try{
        const users = await User.find({}).populate("blogs", { author: 1, title: 1, url: 1 })
        response.json(users.map(user => user.toJSON()))
    } catch(error){
        next(error)
    }
})

userRouter.post("/", async (request, response, next) => {
    try{
        const body = request.body

        if(!body.username){
            return response.status(400).json({ error: "username required" })
        } else if(!body.password){
            return response.status(400).json({ error: "password required" })
        } else if(body.password.length < 3){
            return response.status(400).json({ error: "password minimum length is 3" })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch(error){
        next(error)
    }
})

module.exports = userRouter
