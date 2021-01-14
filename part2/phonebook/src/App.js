import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import peopleService from "./services/people";

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
      setFilteredPersons(initialPeople);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };
    const upadtePerson = persons.find(
      (person) => person.name === newObject.name
    );
    if (upadtePerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        peopleService
          .update(upadtePerson.id, newObject)
          .then((returendPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== upadtePerson.id ? person : returendPerson
              )
            );
            setFilteredPersons(
              persons.map((person) =>
                person.id !== upadtePerson.id ? person : returendPerson
              )
            );
            setSuccessMessage(`Updated ${returendPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          });
      }
    } else {
      peopleService.create(newObject).then((returendPerson) => {
        setPersons(persons.concat(returendPerson));
        setFilteredPersons(persons.concat(returendPerson));
        setSuccessMessage(`Added ${returendPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFiltering = (event) => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value)
    );
    setFilteredPersons(filtered);
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService
        .deletePerson(person.id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setFilteredPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(`${person.name} was already deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFiltering={handleFiltering} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
