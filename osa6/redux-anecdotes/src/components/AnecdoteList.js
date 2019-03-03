import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = ({store}) => {

    const anecdotes = store.getState().anecdotes
    const filter = store.getState().filter
    const filteredAnecdotes = filter !== ""
        ? anecdotes.filter(anecdote => anecdote.content.match(RegExp(filter, "i")))
        : anecdotes
    const sortedAnecdotes = filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        store.dispatch(voteAnecdote(anecdote.id))
        store.dispatch(notify(`you voted ${anecdote.content}`))
        setTimeout(() => store.dispatch(notify("")), 5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
