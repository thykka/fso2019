import React from 'react';
import Note from './components/Note';

const App = ({ notes }) => {

  const rows = () => notes.map(note =>
    <Note key={note.id} note={note} />
  );

  return (
    <section>
      <h1>Muistiinpanot</h1>
      <ul>{rows()}</ul>
    </section>
  );
};

export default App;
