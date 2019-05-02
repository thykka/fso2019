import React from 'react';
import ReactDOM from 'react-dom';

const getOrdinal = (number = 0, _ = Math.abs(number) % 10) => (
  ['th', 'st', 'nd', 'rd'][_ % 10 <= 3 ? _ % 10 : 0]
)

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello, {props.name}!
        You're on your {props.age + getOrdinal(props.age)} revolution around the sun.
      </p>
    </div>
  )
}

const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="foo" age="0" />
      <Hello name="bar" age="1" />
      <Hello name="baz" age="2" />
      <Hello name="quux" age="3" />
      <Hello name="qwop" age="4" />
      <Hello name="zonk" age="-3" />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
