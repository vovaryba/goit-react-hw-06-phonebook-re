import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import phonebookActions from 'redux/phonebook/phonebook-actions';
import { getContacts } from 'redux/phonebook/phonebook-selectors';
import s from './AddContactForm.module.css';

const AddContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
    },
    mode: 'onChange',
  });

  const onSubmitForm = ({ name, number }) => {
    const notUniqueContact = contacts.find(
      prevContact => prevContact.name === name,
    );

    if (notUniqueContact) {
      toast.error(` ${notUniqueContact.name} is already in contacts`);
      reset();
      return;
    }

    dispatch(phonebookActions.addContact({ name, number }));

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            {...register('name', {
              required: { value: true, message: 'Required' },
              pattern: {
                value:
                  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                message:
                  'Name may contain only letters, apostrophe, dash and spaces',
              },
            })}
          />
        </label>
        {errors.name && <p className={s.error}>{errors.name.message}</p>}
        <label>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            {...register('number', {
              required: { value: true, message: 'Required' },
              pattern: {
                value:
                  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
                message:
                  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
              },
            })}
          />
        </label>
        {errors.number && <p className={s.error}>{errors.number.message}</p>}
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    </>
  );
};

export default AddContactForm;
