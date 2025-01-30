import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Average = (props) => {
  const { good, neutral, bad, text } = props
  const countedAverage = (good - bad) / (good + neutral + bad)
  return (
    <p>{text} {countedAverage || 0}</p> // if NaN, returns 0 (|| = or):)
  )
}

const Positive = (props) => {
  const { good, neutral, bad, text } = props
  const positiveAmount = (good / (good + neutral + bad)) * 100
  return (
    <p>{text} {positiveAmount || 0}%</p>
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
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <Average good={good} neutral={neutral} bad={bad} text="average"/>
        <Positive good={good} neutral={neutral} bad={bad} text="amount of positive feedback"/>
      </div>
    </div>
  )
}

export default App
