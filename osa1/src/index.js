import React from 'react';
import ReactDOM from 'react-dom';

const getOrdinal = (number = 0, _ = Math.abs(number) % 10) => (
  ['th', 'st', 'nd', 'rd'][_ % 10 <= 3 ? _ % 10 : 0]
);
const capitalize = (text) => text[0].toUpperCase() + text.substr(1);

const Hello = ({name, age}) => {
  const bornYear = () => (new Date().getFullYear() - age);

  return (
    <section>
      <p>
        Hello, { capitalize(name) }!
      </p><p>
        You { age > 0 ? 'were' : 'will be' } born in { bornYear() }.
      </p><p>
        You're now on your { age + getOrdinal(age) } revolution around the sun.
      </p>
    </section>
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
