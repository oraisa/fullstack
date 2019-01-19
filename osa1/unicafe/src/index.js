import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statictic = ({name, value}) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const sum = good + neutral + bad
    const average = (good - bad) / sum
    const positivePercent = good / sum * 100
    if(sum > 0){
        return (
            <div>
                <table>
                    <tbody>
                        <Statictic name="Hyvä" value={good} />
                        <Statictic name="Neutraali" value={neutral} />
                        <Statictic name="Huono" value={bad} />
                        <Statictic name="Yhteensä" value={sum} />
                        <Statictic name="Keskiarvo" value={average} />
                        <Statictic name="Positiivisia" value={positivePercent + " %"} />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <p>Ei yhtään palautteita</p>
        )
    }
}

const FeedbackButton = ({text, handleClick}) => (
    <button onClick={handleClick}>{text}</button>
)

const Header = ({text}) => (
    <h1>{text}</h1>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="Anna palautetta" />
            <FeedbackButton text="Hyvä" handleClick={() => setGood(good + 1)} />
            <FeedbackButton text="Neutraali" handleClick={() => setNeutral(neutral + 1)} />
            <FeedbackButton text="Huono" handleClick={() => setBad(bad + 1)} />
            <Header text="Statistiikka" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
