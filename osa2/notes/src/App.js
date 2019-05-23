import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import './index.css';

const Footer = () => {
  const footerStyle = {
    color: 'darkslategray',
    backgroundColor: 'gainsboro',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0',
    width: '100%'
  };

  return (
    <footer
      style={footerStyle}
    >
      <em>Notes &mdash; Crasman &copy; 2019</em>
    </footer>
  );
}

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);
  const clearNotification = () => setNotification(null);

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
        setNotification({
          message: `Muistiinpanoa '${note.content}' ei löydy.\n\n${error}`,
          type: 'error'
        });
        setTimeout(clearNotification, 5000);
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
        setNotification({
          message: 'Muistiinpano lisätty!',
          type: 'confirm'
        });
        setTimeout(clearNotification, 5000);
      })

  }

  const handleNoteChange = (event) => {
    setNewNote(event.currentTarget.value);
  };

  return (
    <>
    <section className="notes">
      <h1 className="notes__title">Muistiinpanot</h1>
      <Notification
        notification={notification}
      />
      <div className='notes__controls'>
        <form onSubmit={addNote}>
          <input value={newNote} placeholder='Uusi muistiinpano' onChange={ handleNoteChange } />
          <button type="submit">+ Lisää muistiinpano</button>
        </form>
        <button onClick={ () => setShowAll(!showAll) }>
          Näytä { showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>
      <ul className="notes__list">{rows()}</ul>
    </section>
    <Footer />
    </>
  );
};

export default App;
