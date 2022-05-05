import { useState, useEffect } from 'react';
import shortid from 'shortid';
import AddContactForm from 'components/AddContactForm';
import Filter from 'components/Filter';
import List from 'components/List';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (checkUniqueContact(contact)) {
      setContacts(prevState => [contact, ...prevState]);
    } else {
      alert(contact.name + ' is already in contacts.');
      return;
    }
  };

  const checkUniqueContact = contact => {
    const notUniqueContact = contacts.find(ppl => ppl.name === contact.name);
    if (!notUniqueContact) {
      return contact;
    } else {
      return;
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <List contacts={filteredContacts} onDeleteContact={deleteContact} />
    </>
  );
};

export default App;
