import React from "react"
import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = ({anecdotes, voteAnecdote, notify}) => {


    const vote = (anecdote) => {
        voteAnecdote(anecdote)
        notify(`you voted ${anecdote.content}`, 5)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const anecdotes = state.anecdotes
    const filter = state.filter
    const filteredAnecdotes = filter !== ""
        ? anecdotes.filter(anecdote => anecdote.content.match(RegExp(filter, "i")))
        : anecdotes
    const sortedAnecdotes = filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes)
    return {
        anecdotes: sortedAnecdotes
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
