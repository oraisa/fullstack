const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    likes: Number
})
blogSchema.plugin(uniqueValidator)

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
