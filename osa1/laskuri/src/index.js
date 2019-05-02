import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => <div>{counter}</div>;

const Button = ({ handleClick, label}) => (
  <button onClick={ handleClick }>
    { label }
  </button>
);

const App = (props) => {
  const [ counter, setCounter ] = useState(0);

  const setToValue = (value) => setCounter(value);

  const increment = () => setToValue(counter+1);
  const decrement = () => setToValue(counter-1);
  const reset     = () => setToValue(0);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increment} label="+" />
      <Button handleClick={decrement} label="-" />
      <Button handleClick={reset}     label="X" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
