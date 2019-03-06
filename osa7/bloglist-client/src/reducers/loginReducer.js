import loginService from "../services/login"
import blogService from "../services/blogs"

const reducer = (state = null, action) => {
    switch(action.type){
    case "LOGIN":
        return action.user
    case "LOGOUT":
        return null
    default: return state
    }
}

export const login = (credentials, errorHandler) => async dispatch => {
    try{
        const user = await loginService.login(credentials)
        blogService.setToken(user.token)
        window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user))
        dispatch({
            type: "LOGIN",
            user
        })
    } catch(error){
        errorHandler(error)
    }
}

export const logout = () => {
    blogService.setToken("")
    window.localStorage.removeItem("loggedInBlogUser")
    return {
        type: "LOGOUT"
    }
}

export const initUser = () => dispatch => {
    const loggedInBlogUser = window.localStorage.getItem("loggedInBlogUser")
    if(loggedInBlogUser){
        const user = JSON.parse(loggedInBlogUser)
        blogService.setToken(user.token)
        dispatch({
            type: "LOGIN",
            user
        })
    }
}

export default reducer
