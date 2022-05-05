import { useForm } from 'react-hook-form';
import s from './AddContactForm.module.css';

const AddContactForm = ({ onSubmit }) => {
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
  const onSubmitForm = data => {
    onSubmit(data);
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
