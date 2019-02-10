
const mongoose = require("mongoose")
const config = require("./utils/config")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const app = express()
const blogRouter = require("./controllers/blog")
const errorHandler = require("./utils/error_handler")

const mongoUrl = config.MONGODB_URI
console.log("Connecting to DB")
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Error connecting to MongoDB: ", error)
})

app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())
morgan.token("body", (request) => JSON.stringify(request.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.use("/api/blogs", blogRouter)
app.use(errorHandler)

module.exports = app
