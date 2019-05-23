import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ?
    '\u2191' : // arrow up
    '\u2193';  // arrow down

  return (
    <li className={ ['note', note.important ? ' note--important': ''].join('') }>
      <p className='note__content'>{ note.content }</p>
      <button
        className='note__button'
        onClick={ toggleImportance }>{ label }</button>
    </li>
  )
};

export default Note;
