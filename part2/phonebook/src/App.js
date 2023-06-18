import { useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setfilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        id: persons.length + 1,
        number: newNum,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNum("");
    }
  };

  // const Name = ({ hee }) => {
  //   return (
  //     <div>
  //       {hee.name} {hee.number}
  //     </div>
  //   );
  // };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };
  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons pson={persons} filter={filter} />
    </div>
  );
};

export default App;
