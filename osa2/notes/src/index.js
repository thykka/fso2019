import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const notes = [];


ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
);
