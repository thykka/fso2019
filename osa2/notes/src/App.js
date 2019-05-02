import React, { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'Uusi muistiinpano'
  );
  const [showAll, setShowAll] = useState(true);

  const notesFiltered = showAll ?
    notes : notes.filter(note => note.important);

  const rows = () => notesFiltered.map(note =>
    <Note key={note.id} note={note} />
  );

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false,
      id: (notes.length + 1).toString(16)
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    setNewNote(event.currentTarget.value);
  };

  return (
    <section>
      <h1>Muistiinpanot</h1>
      <div>
        <button onClick={ () => setShowAll(!showAll) }>
          Näytä { showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">+ Lisää muistiinpano</button>
      </form>
    </section>
  );
};

export default App;
