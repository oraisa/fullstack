const blogs = [
    {
        title: "Hello world",
        author: "hello",
        url: "example.com/hello",
        likes: 6,
        id: "1"
    },
    {
        title: "hello matti",
        author: "matti",
        url: "example.com/matti",
        likes: "54",
        id: "2"
    }
]
const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
}

export default { getAll, setToken }
