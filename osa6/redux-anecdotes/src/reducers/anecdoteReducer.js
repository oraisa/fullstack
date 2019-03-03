import anecdoteService from "../services/anecdoteService"

const reducer = (state = [], action) => {
    switch(action.type){
        case "UPDATE":
            return state.map(anecdote => anecdote.id === action.data.id
                ? action.data
                : anecdote
            )
        case "CREATE":
            return state.concat(action.data)
        case "INIT":
            return action.data
        default: return state
    }
}

export const voteAnecdote = anecdote => async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
        type: "UPDATE",
        data: updatedAnecdote
    })
}

export const createAnecdote = anecdote => async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
        type: "CREATE",
        data: newAnecdote
    })
}

export const initAnecdotes = () => async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
        type: "INIT",
        data: anecdotes
    })
}

export default reducer
