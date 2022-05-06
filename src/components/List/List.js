import { useSelector, useDispatch } from 'react-redux';
import phonebookActions from 'redux/phonebook/phonebook-actions';
import { getFilteredContacts } from 'redux/phonebook/phonebook-selectors';
import s from './List.module.css';

const List = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = id => dispatch(phonebookActions.deleteContact(id));

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button
            className={s.button}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
