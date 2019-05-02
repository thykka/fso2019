import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const {counter} = props;
  return (
    <div>
      <h1>{counter}</h1>
    </div>
  );
}

let counter = 1;

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById('root')
);
