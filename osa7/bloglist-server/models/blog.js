const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true, unique: true },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        { type: String, required: true }
    ]
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
