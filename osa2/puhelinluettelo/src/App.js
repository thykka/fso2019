import React, { useState, useEffect } from 'react';
import Persons from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);

  useEffect(() => {
    Persons.getList().then(data => setPersons(data));
  }, []);

  const [ filter, setFilter ] = useState('');
  const filteredContacts = persons.filter(
    person => person.name.toLowerCase()
      .indexOf(filter.toLowerCase()) >= 0
  );

  const addPerson = (name, number) => {
    const existingPerson = persons.find(person=>
      person.name === name || person.number === number
    );
    if(existingPerson && confirm(`${ name } on jo luettelossa, korvataanko tiedot?`)) {
      Persons.edit(existingPerson.id, { name, number })
        .then(editedPerson => setPersons(
          persons.map(person =>
            person.id === existingPerson.id ? editedPerson : person
          )
        ))
        .catch(error => console.error(error));
    } else {
      Persons.create({ name, number })
        .then(newPerson => setPersons([...persons, {
          name: newPerson.name,
          number: newPerson.number,
          id: newPerson.id
        }]))
        .catch(error => console.error(error));
    }
  };

  const removePerson = (id) => {
    if(confirm('Poistetaan ' + persons.find(person => person.id === id).name + '?')) {
      Persons.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

  return (
    <section>
      <h1>Puhelinluettelo</h1>
      <NewContact addPerson={ addPerson } />
      <h2>Numerot</h2>
      <Filter filter={ filter } setFilter={ setFilter } />
      <ContactList persons={ filteredContacts } removePerson={ removePerson } />
    </section>
  );
};

const NewContact = ({ addPerson }) => {
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.currentTarget.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson(
      newName,
      newNumber
    );
    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lisää yhteystieto</h2>
      <div>nimi:   <input value={newName}   onChange={handleNameChange} /></div>
      <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">Lisää</button></div>
  </form>
  )
};

const Filter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.currentTarget.value);
  };

  return <div>
    Rajaa: <input value={ filter } onChange={ handleChange } />
  </div>;
};

const ContactList = ({ persons, removePerson }) => <ul>
  {
    persons.map(person =>
    <ContactItem
      key={ person.id }
      person={ person }
      removePerson={ () => removePerson(person.id) }
    />
    )
  }
</ul>;

const ContactItem = ({ person, removePerson }) => <li>
  <button onClick={ removePerson }>X</button>
  { person.name } — { person.number }
</li>;

export default App;
