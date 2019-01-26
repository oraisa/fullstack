import React from "react"

const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <div>
            <p>yhteensä {parts.reduce((acc, part) => acc + part.exercises, 0)} tehtävää</p>
        </div>
    )
}

const Course = ({course}) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
    </div>
)

export default Course
