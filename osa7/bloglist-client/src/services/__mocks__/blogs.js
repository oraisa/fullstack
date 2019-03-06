const blogs = [
    {
        title: "Hello world",
        author: "hello",
        url: "example.com/hello",
        likes: 6,
        id: "1",
        user: {
            id: 5,
        }
    },
    {
        title: "hello matti",
        author: "matti",
        url: "example.com/matti",
        likes: "54",
        id: "2",
        user: {
            id: 5,
        }
    }
]
const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
}

export default { getAll, setToken }
