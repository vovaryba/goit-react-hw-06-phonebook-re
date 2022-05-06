import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddContactForm from 'components/AddContactForm';
import Filter from 'components/Filter';
import List from 'components/List';

const App = () => {
  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm />

      <h2>Contacts</h2>
      <Filter />
      <List />
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
