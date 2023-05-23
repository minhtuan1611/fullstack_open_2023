import { useState } from "react";
const Anecdote = ({ anecdotes, votes }) => (
  <>
    {anecdotes}
    <br />
    has {votes} votes
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const Handleramdomise = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };
  const most = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdotes of the day!</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={Handleramdomise}>next anecdotes</button>
      <h2>Anecdotes with most votes!</h2>
      <Anecdote anecdotes={anecdotes[most]} votes={votes[most]} />
    </div>
  );
};

export default App;
