import React from "react"
import { render, waitForElement } from "react-testing-library"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
    it("if no user logged, notes are not rendered", async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)
        await waitForElement(() => component.getByText("Login"))

        const blogs = component.container.querySelectorAll(".blog")
        expect(blogs.length).toBe(0)
    })

    it("if user is logged in, notes are rendered", async () => {
        const user = {
            username: "matti",
            name: "Matti",
            token: "1234"
        }
        window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user))
        const component = render(
            <App />
        )
        component.rerender(<App />)
        await waitForElement(() => component.getByText("Logout"))
        const blogs = component.container.querySelectorAll(".blog")
        expect(blogs.length).toBe(2)
    })
})
