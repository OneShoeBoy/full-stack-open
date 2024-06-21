import { useState, useEffect } from "react";

import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from './components/Notification'

import peopleService from "./services/people";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    peopleService.getPeople().then((currentPeople) => setPeople(currentPeople));
  }, []);

  const updatePerson = (personToUpdate) => {
    if (
      window.confirm(
        `${personToUpdate.name} is already in the phonebook. Replace old number with a new one?`
      )
    ) {
      const newPhNumber = { ...personToUpdate, phNumber: newNumber };

      peopleService
        .updatePerson(newPhNumber.id, newPhNumber)
        .then((returnedPerson) => {
          setPeople(
            people.map((person) =>
              person.id !== newPhNumber.id ? person : returnedPerson
            )
          );
        })
        .then(() => {
            const newNotification = {
              message: `${newPhNumber.name} changed!`,
              status: null
            }
            setNotification(newNotification)
          })
        .then(() => {
          setTimeout(() => {
            setNotification(null);}, 5000);
        })
        .catch(error => {
          const errorNotification = {
            ...notification,
            message: `${newPhNumber.name} has already been deleted from server.`,
            status: error.response.status,
          }
          setNotification(errorNotification);
          }
        )
        .then( () => {
          setTimeout(() => {
            setNotification(null)}, 5000);
          });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameArray = people.map((person) => person.name.toLowerCase());
    if (nameArray.includes(newName.toLowerCase()) === true) {
      const personToUpdate = people.find((person) => person.name === newName);
      updatePerson(personToUpdate);
    } else {
      const personObject = {
        name: newName,
        phNumber: newNumber,
      };
      peopleService
        .createPerson(personObject)
        .then((response) => setPeople(people.concat(response)))
        .then(() => {
          const newNotification = {
            message: `${personObject.name} added!`,
            status: null
          }
          
          setNotification(newNotification)
        })
      .then(() => {
        setTimeout(() => {
          setNotification(null);}, 5000);
      })
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (id) => {
    const personToDelete = people.find((person) => person.id === id);

    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      const newPeople = people.filter((person) =>
        person.id !== id ? person : null
      );

      peopleService.deletePerson(id)
      .then(setPeople(newPeople))
      .then(() => {
        const newNotification = {
          message: `${personToDelete.name} deleted!`,
          status: null
        }
        setNotification(newNotification)
      })
    .then(() => {
      setTimeout(() => {
        setNotification(null)}, 5000);
    })
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNameSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        notification={notification} 
      />
      <Filter nameSearch={nameSearch} handleSearch={handleSearch} />
      <h3>Add new</h3>
      <PersonForm
        name={newName}
        phone={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      {people.map((person) => (
        <Person
          key={person.id}
          person={person}
          nameSearch={nameSearch}
          deletePerson={() => {
            deletePerson(person.id);
          }}
        />
      ))}
    </div>
  );
};

export default App;
