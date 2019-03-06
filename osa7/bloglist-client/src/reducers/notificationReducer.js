
const reducer = (state = {notification: "", error: ""}, action) => {
    switch(action.type){
    case "NOTIFY":
        return {...state, notification: action.notification}
    default: return state
    case "ERROR":
        return {...state, error: action.error}
    }
}

export const notify = (message, time = 5) => dispatch => {
    setTimeout(() => { dispatch({type: "NOTIFY", notification: ""}) }, time * 1000)
    dispatch({
        type: "NOTIFY",
        notification: message
    })
}

export const notifyError = (message, time = 5) => dispatch => {
    setTimeout(() => { dispatch({type: "ERROR", error: ""}) }, time * 1000)
    dispatch({
        type: "ERROR",
        error: message
    })
}

export default reducer
