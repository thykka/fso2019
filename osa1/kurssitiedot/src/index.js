import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{ props.course }</h1>
);

const Content = (props) => {
  return props.parts.map(part => (
    <Part key={part.name} name={part.name} exercises={part.exercises}></Part>
  ));
}

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => (
  <p>Yhteensä {
      props.parts.reduce((acc, part) => acc + part.exercises, 0)
    } tehtävää
  </p>
);

const App = () => {
  const course = 'Half Stack -sovelluskehitys';
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    }, {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    }, {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
