const listHelper = require("../utils/list_helpers")
const blogLists = require("./blog_lists")
const listWithOneBlog = blogLists.listWithOneBlog
const listWithTwoBlogs = blogLists.listWithTwoBlogs
const biggerList = blogLists.biggerList

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
        expect(result).toBeUndefined()
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
