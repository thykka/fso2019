import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Feedback = ({ controls }) => {
  return (
    <section>
    <h1>Anna palautetta</h1>
    {
      controls.map(({changeFn, change, label}) => (
        <Button
          handleClick={() => changeFn(change)}
          key={label}
          label={label}
          />
      ))
    }
    </section>
  );
};

const Statistics = ({ statistics }) => {
  const { good, neutral, bad } = statistics;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total);

  return (
    <section>
      <h2>Statistiikka</h2>
      <p>Hyvä: { good }</p>
      <p>Neutraali: { neutral }</p>
      <p>Huono: { bad }</p>
      <p>Yhteensä: { total }</p>
      <p>Keskiarvo: {
        Number.isNaN(average) ? '-' : average
      }</p>
      <p>Positiivisia: {
        Number.isNaN(positive) ? '-' : Math.round(positive * 100)
      }%</p>
    </section>
  );
}

const Button = ({label, handleClick}) => (
  <button onClick={handleClick}>
    {label}
  </button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = [
    {
      value: good,
      label: 'Hyvä 😃',
      change: good + 1,
      changeFn: setGood
    }, {
      value: neutral,
      label: 'Neutraali 😐',
      change: neutral + 1,
      changeFn: setNeutral
    }, {
      value: bad,
      label: 'Huono 😣',
      change: bad + 1,
      changeFn: setBad
    },
  ];

  const statistics = {
    good, neutral, bad
  };

  return (
    <div>
      <Feedback controls={feedback} />
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
