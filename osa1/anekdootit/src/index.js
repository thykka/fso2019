import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const getRandomIndex = (array) => {
  return Math.floor(array.length * Math.random());
};

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.from({ length: anecdotes.length}).fill(0)
  );

  const addVote = (anecdoteIndex) => {
    return () => {
      const newVotes = [...votes];
      newVotes[anecdoteIndex] += 1;
      setVotes(newVotes);
    }
  };

  const nextAnecdote = () => {
    let next;
    let tries = 0;
    do {
      next = getRandomIndex(anecdotes);
      tries++;
    } while (
      tries < 100 &&
      anecdotes.length !== 0 &&
      next === selected
    );
    setSelected(next);
  };

  const best = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdote
        text={ anecdotes[selected].text }
        votes={ votes[selected] }
        index={ selected + 1 }
        type="of the day"
        />
      <button onClick={ addVote(selected) }>
        Vote
      </button>
      <button onClick={ nextAnecdote }>
        Next anecdote
      </button>
      <Anecdote
        text={ anecdotes[best].text }
        votes={ votes[best] }
        index={ best + 1 }
        type="with most votes"
        />
    </div>
  );
};

const Anecdote = ({ text, votes, index, type }) => {
  return (
    <section>
      <h2>Anecdote { type } ({ index })</h2>
      <blockquote>
        <p>{ text }</p>
      </blockquote>
      <p>Votes: { votes }</p>
    </section>
  )
}

const anecdotes = [
  {
    text: 'If it hurts, do it more often'
  }, {
    text: 'Adding manpower to a late software project makes it later!'
  }, {
    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
  }, {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
  }, {
    text: 'Premature optimization is the root of all evil.'
  }, {
    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  }
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
