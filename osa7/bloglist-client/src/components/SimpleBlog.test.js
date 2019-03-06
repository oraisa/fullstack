import React from "react"
import { render, fireEvent } from "react-testing-library"
import SimpleBlog from "./SimpleBlog"
import { prettyDOM } from "dom-testing-library"

test("renders title, author, likes", () => {
    const blog = {
        title: "Hello World blog",
        author: "Matti",
        likes: 5768
    }

    const component = render(
        <SimpleBlog blog={blog}/>
    )
    const titleElement = component.getByText(/Hello World blog/)
    expect(titleElement).toBeDefined()
    const authorElement = component.getByText(/Matti/)
    expect(authorElement).toBeDefined()
    const likesElement = component.getByText(/5768/)
    expect(likesElement).toBeDefined()
})

test("clicking like twice calls event handler twice", () => {
    const blog = {
        title: "Hello World blog",
        author: "Matti",
        likes: 5768
    }
    const mockHandler = jest.fn()
    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler}/>
    )
    const button = component.getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})
