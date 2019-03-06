import React from "react"
import { render, fireEvent } from "react-testing-library"
import Blog from "./Blog"
import { prettyDOM } from "dom-testing-library"

test("blog has correct elements", () => {

    const blog = {
        title: "Hello World blog",
        author: "Matti",
        likes: 5768,
        url: "example.com",
        user: {
            name: "Pekka"
        }
    }

    const component = render(
        <Blog blog={blog} showRemove={true} handleLike={() => {}} handleDelete={() => {}}/>
    )
    const titleElement = component.getByText(/Hello World blog/)
    expect(titleElement).toBeDefined()
    const authorElement = component.getByText(/Matti/)
    expect(authorElement).toBeDefined()
    const likesElement = component.getByText(/5768/)
    expect(likesElement).toBeDefined()
    const likeButton = component.getByText(/Like/)
    expect(likeButton).toBeDefined()
    const urlElement = component.getByText(/example.com/)
    expect(urlElement).toBeDefined()
    const userElement = component.getByText(/Pekka/)
    expect(userElement).toBeDefined()
    const removeButton = component.getByText(/Remove/)
    expect(removeButton).toBeDefined()
})

test("at first only title and author are shown", () => {
    const blog = {
        title: "Hello World blog",
        author: "Matti",
        likes: 5768,
        url: "example.com",
        user: {
            name: "Pekka"
        }
    }

    const component = render(
        <Blog blog={blog} showRemove={true} handleLike={() => {}} handleDelete={() => {}}/>
    )

    const titleAuthorDiv = component.container.querySelector(".blogTitleAuthor")
    expect(titleAuthorDiv).not.toHaveStyle("display: none")
    const restDiv = component.container.querySelector(".restOfBlog")
    expect(restDiv).toHaveStyle("display: none")
})

test("after clicking title the rest is shown", () => {
    const blog = {
        title: "Hello World blog",
        author: "Matti",
        likes: 5768,
        url: "example.com",
        user: {
            name: "Pekka"
        }
    }

    const component = render(
        <Blog blog={blog} showRemove={true} handleLike={() => {}} handleDelete={() => {}}/>
    )
    const titleAuthorDiv = component.container.querySelector(".blogTitleAuthor")
    fireEvent.click(titleAuthorDiv)

    const restDiv = component.container.querySelector(".restOfBlog")
    expect(restDiv).not.toHaveStyle("display: none")
})
