import React, { useState, useEffect } from 'react';
import Persons from './services/persons';
import Notification, { NotificationDuration } from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ notification, setNotification ] = useState();
  const clearNotification = () => setNotification(null);

  useEffect(() => {
    Persons.getList().then(data => setPersons(data));
  }, []);

  const [ filter, setFilter ] = useState('');
  const filteredContacts = persons.filter(
    person =>
      person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      person.number.indexOf(filter) >= 0
  );

  const notify = (notification) => {
    setNotification(notification);
    setTimeout(clearNotification, NotificationDuration[notification.type]);
  }

  const addPerson = (name, number) => {
    const existingPerson = persons.find(person=>
      person.name === name || person.number === number
    );
    if(existingPerson && confirm(`${ name } on jo luettelossa, korvataanko tiedot?`)) {
      Persons.edit(existingPerson.id, { name, number }).then(editedPerson => {
        setPersons(persons.map(person => person.id === existingPerson.id ? editedPerson : person ));
        notify({ message: 'Yhteystieto päivitetty: ' + editedPerson.name, type: 'confirm' });
      })
        .catch(error => notify({ message: `Tietojen päivitys epäonnistui`, type: 'error', error }) );
    } else {
      Persons.create({ name, number }).then(newPerson => {
        setPersons([...persons, newPerson]);
        notify({ message: 'Henkilö lisätty: ' + newPerson.name, type: 'confirm' });
      })
        .catch(error => notify({ message: `Henkilön lisäys epäonnistui`, type: 'error', error }) );
    }
  };

  const removePerson = (id) => {
    const removePerson = persons.find(person => person.id === id);

    if(
      removePerson &&
      confirm('Poistetaan henkilö ' + removePerson.name + '?')
    ) {
      Persons.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          notify({ message: 'Henkilö poistettu: ' + removePerson.name, type: 'confirm' });
        })
          .catch(error => notify({ message: `Henkilön poisto epäonnistui`, type: 'error', error }) );
    }
  }

  return (
    <section className='contacts'>
      <h1>Puhelinluettelo</h1>
      <Notification notification={notification} />
      <NewContact addPerson={ addPerson } />
      <h3>Numerot</h3>
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
    <form className='contacts__new' onSubmit={handleSubmit}>
      <h3>Lisää yhteystieto</h3>
      <div className='form-control'>
        Nimi:<br /><input value={newName}   onChange={handleNameChange} />
      </div>
      <div className='form-control'>
        Numero:<br /><input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div className='form-control'>
        <button type="submit">Lisää</button>
      </div>
  </form>
  )
};

const Filter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.currentTarget.value);
  };

  return <div>
    Rajaa:<br /><input value={ filter } onChange={ handleChange } />
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

const ContactItem = ({ person, removePerson }) => <li data-id={ person.id }>
  <button onClick={ removePerson }>X</button>
  { person.name } — { person.number }
</li>;

export default App;
