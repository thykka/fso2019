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
    if(persons.map(p=>p.name).includes(name)) {
      alert(`${ name } on jo luettelossa!`);
    } else {
      Persons.create({ name, number })
      .then(({name, number}) => setPersons([...persons, { name, number }]))
      .catch(error => console.error(error));
    }
  };

  return (
    <section>
      <h1>Puhelinluettelo</h1>
      <NewContact addPerson={ addPerson } />
      <h2>Numerot</h2>
      <Filter filter={ filter } setFilter={ setFilter } />
      <ContactList persons={ filteredContacts } />
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

const ContactList = ({ persons }) => <ul>
  {
    persons.map(person =>
    <ContactItem key={ person.name } person={person} />
    )
  }
</ul>;

const ContactItem = ({ person }) => <li>
  { person.name } — { person.number }
</li>;

export default App;
