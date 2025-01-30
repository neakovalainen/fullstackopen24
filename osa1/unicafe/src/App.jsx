import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Average = (props) => {
  const { good, neutral, bad } = props
  const countedAverage = (good - bad) / (good + neutral + bad)
  return (
    <StatisticLine text="average" value={countedAverage || 0}/> // if NaN, returns 0 (|| = or):)
  )
}

const Positive = (props) => {
  const { good, neutral, bad } = props
  const positiveAmount = (good / (good + neutral + bad)) * 100
  return (
    <StatisticLine text="amount of positive feedback" value={`${positiveAmount || 0}%`}/> // `${}` = f"{}" in python
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  if ((good + neutral + bad) == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good + neutral + bad}/>
      <Average good={good} neutral={neutral} bad={bad}/>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good, neutral, bad)

  return (
    <div>
      <div>
        <h1><b>how was the food?</b></h1>
        <Button onClick={() => setGood(good + 1)} text="good yummyyy"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="kinda ok ig"/>
        <Button onClick={() => setBad(bad + 1)} text="it was bad ..."/>
      </div>
      <div>
        <h2>stats:</h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App
