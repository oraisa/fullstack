
const mongoose = require("mongoose")
const config = require("./utils/config")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const app = express()
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const errorHandler = require("./utils/error_handler")
const tokenExtractor = require("./utils/token_extractor")
const loginRouter = require("./controllers/login")
const logger = require("./utils/logger")

const mongoUrl = config.MONGODB_URI
logger.info("Connecting to DB")
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
    logger.info("Connected to MongoDb")
}).catch((error) => {
    logger.error("Error connecting to MongoDB: ", error)
})

app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())
if(process.env.NODE_ENV === "development"){
    morgan.token("body", (request) => JSON.stringify(request.body))
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
}
app.use(tokenExtractor)

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(errorHandler)

module.exports = app
