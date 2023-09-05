import personService from "./services/persons";
import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setfilter] = useState("");

  const [status, setStatus] = useState(null);
  const [Message, setMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNum };
    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setStatus("error");
            setMessage(
              `Information of ${foundPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setStatus(null);
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        id: persons.length + 1,
        number: newNum,
      };
      personService.create(nameObject).then((addedPerson) => {
        setPersons(persons.concat(nameObject));
        setStatus("success");
        setMessage(`Added ${nameObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNum("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };
  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };

  const handleDeleteP = (id, name) => () => {
    if (window.confirm(`Delete ${name}`)) {
      personService.remove(id).then((deletedPerson) => {
        setPersons(
          persons.filter((person) => person.name !== deletedPerson.name)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} status={status} />

      <Filter filterr={filter} handleChange={handleFilterChange} />

      <h3>add a news</h3>
      <PersonForm
        nName={newName}
        nNum={newNum}
        hName={handleNameChange}
        hNum={handleNumChange}
        oSub={addPerson}
      />

      <h3>Numbers</h3>
      <Persons pson={persons} filter={filter} handleDeleteP={handleDeleteP} />
    </div>
  );
};

export default App;
