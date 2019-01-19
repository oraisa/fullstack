import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes}) => (
    <div>
        <p>{text}</p>
        <p>{votes} ääntä</p>
    </div>
)

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>{text}</button>
)

const App = ({anecdotes}) => {
    const randomAnecdoteIndex = () => Math.floor(Math.random() * anecdotes.length)
    const [selected, setSelected] = useState(randomAnecdoteIndex())
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const indexOfMostVotes = votes.indexOf(Math.max(...votes))
    const randomizeSelection = () => setSelected(randomAnecdoteIndex())
    const vote = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)
    }

    return (
        <div>
            <h1>Päivän anekdootti</h1>
            <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
            <Button text="Äänestä" handleClick={vote} />
            <Button text="Seuraava anekdootti" handleClick={randomizeSelection} />
            <h1>Eniten ääniä</h1>
            <Anecdote text={anecdotes[indexOfMostVotes]} votes={votes[indexOfMostVotes]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
