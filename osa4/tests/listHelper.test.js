const listHelper = require("../utils/listHelpers")

const listWithOneBlog = [
    {
        id: "5a422aa71b54a676234d17f8d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
]

const listWithTwoBlogs = [
    {
        id: "5a422aa71b54a676234d17f8d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        id: "5a422aa71b54a676236d17f8d17f8",
        title: "Hello world",
        author: "Edsger W. Dijkstra",
        url: "https://example.com/hello_world",
        likes: 100,
    }
]

const biggerList = [
    {
        id: "5a422aa71b54a676234d17f8d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        id: "5a422aa71b54a676236d17f8d17f8",
        title: "Hello world",
        author: "Edsger W. Dijkstra",
        url: "https://example.com/hello_world",
        likes: 100,
    },
    {
        id: "5a422aa71b54a676234d17f8d17f8",
        title: "The Art Of Computer Programming",
        author: "Donald Knuth",
        url: "https://example.com/the_art",
        likes: 1,
    },
    {
        id: "5a422aa71b54a676236d17f8d17f8",
        title: "Hello world by Anonomyos",
        author: "Anonomyos",
        url: "https://example.com/hello_world_anon",
        likes: 1000,
    },
]

test("dummy returns one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe("total likes", () => {

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(listWithOneBlog[0].likes)
    })

    test("when list has two blogs equals the sum of their likes", () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        const likes1 = listWithTwoBlogs[0].likes
        const likes2 = listWithTwoBlogs[1].likes
        expect(result).toBe(likes1 + likes2)
    })

    test("when list is empty equals 0", () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(biggerList)
        expect(result).toBe(5 + 100 + 1 + 1000)
    })
})

describe("favourite blog", () => {

    test("with empty list is undefined", () => {
        const result = listHelper.favouriteBlog([])
        expect(result).toBe(undefined)
    })

    test("with one blog list to be that blog", () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test("with bigger list to return the right blog", () => {
        const result = listHelper.favouriteBlog(biggerList)
        expect(result).toEqual(biggerList[3])
    })
})
