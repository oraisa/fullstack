
const reducer = (state = "", action) => {
    switch(action.type){
        case "NOTIFY":
            return action.notification
        default: return state
    }
}

export const notify = message => ({
    type: "NOTIFY",
    notification: message
})

export default reducer
