
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
      <h2>
        {props.course.name}
      </h2>
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

export default Course