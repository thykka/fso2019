import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Feedback = ({ feedback }) => {
  return (
    <section>
    <h1>Anna palautetta</h1>
    {
      feedback.map(({changeFn, change, label, name}) => (
        <Button
          handleClick={() => changeFn(change)}
          key={name}
          label={label}
          />
      ))
    }
    </section>
  );
};

const Statistics = ({ feedback }) => {
  const [ good, neutral, bad ] = feedback;

  const header = (<h2>Statistiikka</h2>);
  let statistics = (<p>Ei yhtään palautetta annettu</p>);

  const total = good.value + neutral.value + bad.value;

  if(total > 0) {
    const average = (good.value - bad.value) / total;
    const positive = (good.value / total);
    statistics = (
      <table>
        <tbody>
          <Statistic label={good.label} value={good.value} />
          <Statistic label={neutral.label} value={neutral.value} />
          <Statistic label={bad.label} value={bad.value} />
          <Statistic label="Yhteensä" value={ total } />
          <Statistic label="Keskiarvo" value={ Number.isNaN(average) ? '-' : average } />
          <Statistic label="Positiivisia" value={ Number.isNaN(positive) ? '-' : Math.round(positive * 100) + '%' } />
        </tbody>
      </table>);
  }

  return (
    <section>
      {header}
      {statistics}
    </section>
  );
}

const Statistic = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ label, handleClick }) => (
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
      name: 'good',
      value: good,
      label: 'Hyvä 😃',
      change: good + 1,
      changeFn: setGood
    }, {
      name: 'neutral',
      value: neutral,
      label: 'Neutraali 😐',
      change: neutral + 1,
      changeFn: setNeutral
    }, {
      name: 'bad',
      value: bad,
      label: 'Huono 😣',
      change: bad + 1,
      changeFn: setBad
    },
  ];

  return (
    <div>
      <Feedback feedback={feedback} />
      <Statistics feedback={feedback} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
