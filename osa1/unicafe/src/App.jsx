import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
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
      </div>
    </div>
  )
}

export default App
