import { useState, useEffect } from 'react'
import peopleService from './services/people'

const Person = ({person, nameSearch, deletePerson}) => {
  if(nameSearch === ''){
    return(
      <div>
        <p>{person.name} {person.phNumber}</p>
        <button type="submit" onClick={deletePerson}>Delete</button>
      </div>
    );  
  } else if(person.name.toLowerCase().includes(nameSearch.toLowerCase())){
    return(
      <div>
        <p>{person.name} {person.phNumber}</p>
        <button type="submit" onClick={person.deletePerson}>Delete</button>
      </div>
    )
  }
  
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.name} onChange={props.handleNewName}/>
        </div>
        <div>
          number: <input value={props.phone} onChange={props.handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      Search: <input value={props.nameSearch} onChange={props.handleSearch}/>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  useEffect(() => {
    peopleService
      .getPeople()
      .then((currentPeople) => setPeople(currentPeople));
  }, []);

  const updatePerson = (id) => {
    const personToUpdate = people.find(person => person.id ===id);
    
    if(window.confirm(`${personToUpdate.name} is already in the phonebook. Replace old number with a new one?`)){
      
      const newPeople = people.filter((person) =>
        person.id !== id ? person : {...people, phNumber: newNumber})

      peopleService.updatePerson(id, newPeople).then(setPeople(newPeople));

    }

  }

  const addPerson = (event) => {
    event.preventDefault();
    const nameArray = people.map(person => person.name.toLowerCase());
    if (nameArray.includes(newName.toLowerCase()) === true) {
      alert(`${newName} is already added to phonebook!`);
    
    
    
    } else {
      const personObject = {
        name: newName,
        phNumber: newNumber,
        id: `${people.length + 1}`
      };

      peopleService
        .createPerson(personObject)
        .then((response) => setPeople(people.concat(response)));

      setNewName("");
      setNewNumber("");
    }
  }

  const deletePerson = (id) => {

    const personToDelete = people.find(person => person.id === id);

    if(window.confirm(`Do you want to delete ${personToDelete.name}?`)){
      const newPeople = people.filter((person) =>
        person.id !== id ? person : null
      );

      peopleService.deletePerson(id).then(
        setPeople(newPeople)
      );
    }
  }


  const handleNewName = (event) => {
    setNewName(event.target.value);
    
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setNameSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} handleSearch={handleSearch}/>
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
        <Person key={person.id} person={person} nameSearch={nameSearch} deletePerson={(()=>{deletePerson(person.id)})}/>
      ))}
    </div>
  );
}

export default App