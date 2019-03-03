
const reducer = (state = "", action) => {
    switch(action.type){
        case "NOTIFY":
            return action.notification
        default: return state
    }
}

export const notify = (message, time) => dispatch => {
    setTimeout(() => { dispatch({type: "NOTIFY", notification: ""}) }, time * 1000)
    dispatch({
        type: "NOTIFY",
        notification: message
    })
}

export default reducer
