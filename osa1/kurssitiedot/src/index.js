import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{ props.course }</h1>
  );
};

const Content = (props) => {
  const parts = JSON.parse(props.parts);
  return (
    <>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};
const Total = (props) => {
  const parts = JSON.parse(props.parts);
  return (
    <>
      <p>Yhteensä {
          parts[0].exercises +
          parts[1].exercises +
          parts[2].exercises
        } tehtävää
      </p>
    </>
  );
};

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
      <Content parts={JSON.stringify(parts)} />
      <Total parts={JSON.stringify(parts)} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
