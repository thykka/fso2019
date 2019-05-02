import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [ counter, setCounter ] = useState(0);

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  return (
    <div>
      <h1>{counter}</h1>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
