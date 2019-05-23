import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import './index.css';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'Uusi muistiinpano'
  );
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes));
  };

  useEffect(hook, []);

  const notesFiltered = showAll ?
    notes : notes.filter(note => note.important);

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note =>
          note.id !== id ? note : returnedNote
        ))
      })
      .catch(error => {
        alert(`Muistiinpanoa '${note.content}' ei löydy.\n\n${error}`);
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const rows = () => notesFiltered.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  );

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })

  }

  const handleNoteChange = (event) => {
    setNewNote(event.currentTarget.value);
  };

  return (
    <section className="notes">
      <h1 className="notes__title">Muistiinpanot</h1>
      <div>
        <button onClick={ () => setShowAll(!showAll) }>
          Näytä { showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>
      <ul className="notes__list">{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">+ Lisää muistiinpano</button>
      </form>
    </section>
  );
};

export default App;
