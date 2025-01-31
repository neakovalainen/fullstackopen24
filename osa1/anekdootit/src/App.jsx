import { useState } from 'react'

const MostPopular = (props) => {
  const maximum = Math.max(...props.votes)

  const index = props.votes.indexOf(maximum)
  
  return (
    <p>{props.anecdotes[index]}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(anecdote => 0)) // creates a correct sized array

  const addVote = () => {
    const copy = [...votes] // copy the list, can't update!!!
    copy[selected] += 1

    setVotes(copy) // copy = vote
  }


  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <p>has {votes[selected]} votes!</p>
      <button onClick={addVote}>
        i kinda like this one
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>
      generate a quote
      </button>
      <h1>Anecdote with most votes:</h1>
      <MostPopular votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
