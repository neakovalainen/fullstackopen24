const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )

}

const Content = ({ parts }) => {
  return (
  <div>
    {parts.map(part =>
    <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  const initialValue = 0
  const totalOfExercises = props.parts.reduce(
    (accumulator, props) => accumulator + props.exercises,
    initialValue,
  )
  return (
    <h4>there are {totalOfExercises} exercises in total</h4>
  )

}
export default App
