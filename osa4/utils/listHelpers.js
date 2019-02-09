
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((acc, likes) => acc + likes, 0)
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }
    let currentFavourite = blogs[0]
    blogs.forEach((blog) => {
        if(blog.likes > currentFavourite.likes){
            currentFavourite = blog
        }
    })
    return currentFavourite
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}
