
describe("Blog app", function() {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/test/reset")
        const user = {
            name: "Matti Meikäläinen",
            username: "mmei",
            password: "porkkana"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("show login at first", function() {
        cy.contains("Login")
    })

    describe("after logging in", function() {
        beforeEach(function() {
            cy.get("#username").type("mmei")
            cy.get("#password").type("porkkana")
            cy.contains("Login").click()
        })

        it("after logging in show front page", function() {
            cy.contains("Blogs")
        })

        it("after logging in show the users name", function() {
            cy.contains("Matti Meikäläinen")
        })

        it("navigating to users shows user", function() {
            cy.contains("users").click()
            cy.contains("Matti Meikäläinen")
        })

        it("after navigating to users, navigating to blogs shows front page", function() {
            cy.contains("users").click()
            cy.contains("blogs").click()
            cy.contains("Existing blogs")
        })

        it("logout logs user out", function() {
            cy.contains("logout").click()
            cy.contains("Login")
        })

        describe("after creating a blog", function() {
            beforeEach(function() {
                cy.get("#showCreateBlog").click()
                cy.get("#title").type("New Blog")
                cy.get("#author").type("Matti Meikäläinen")
                cy.get("#url").type("example.com/New_Blog")
                cy.get("#createBlog").click()
            })

            it("a blog can be created", function() {
                cy.contains("New Blog Matti Meikäläinen")
            })

            it("can navigate to created blog", function() {
                cy.contains("New Blog Matti Meikäläinen").click()
                cy.contains("Matti Meikäläinen")
                cy.contains("New Blog")
                cy.contains("like")
                cy.contains("remove")
            })

            it("can like blog", function() {
                cy.contains("New Blog Matti Meikäläinen").click()
                cy.contains("0 likes")
                cy.get("#likeButton").click()
                cy.contains("1 likes")
            })

            it("can delete blog", function() {
                cy.contains("New Blog Matti Meikäläinen").click()
                cy.get("#deleteBlogButton").click()
                cy.contains("Existing blogs")
            })

            it("can comment on blog", function() {
                cy.contains("New Blog Matti Meikäläinen").click()
                cy.get("#commentText").type("Hello World")
                cy.get("#commentButton").click()
                cy.contains("Hello World")
            })
        })
    })
})
