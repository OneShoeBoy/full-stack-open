import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person, nameSearch}) => {
  if(nameSearch === ''){
    return(
      <div>
        <p>{person.name} {person.phNumber}</p>
      </div>
    );  
  } else if(person.name.toLowerCase().includes(nameSearch.toLowerCase())){
    return(
      <div>
        <p>{person.name} {person.phNumber}</p>
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
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response => {
      setPersons(response.data);
    }))
  }, []);


  const addPerson = (event) => {
    event.preventDefault();

    const nameArray = persons.map(person => person.name.toLowerCase());
    const phoneArray = persons.map(person => person.phNumber);
    if (
      nameArray.includes(newName.toLowerCase()) === true ||
      phoneArray.includes(newNumber) === true
    ) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      const personObject = {
        name: newName,
        phNumber: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  }

  const handleNewName = (event) =>{
    setNewName(event.target.value);
    
  }

  const handleNewNumber = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) =>{
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
      {persons.map((person) => (
        <Person key={person.id} person={person} nameSearch={nameSearch}/>
      ))}
    </div>
  );
}

export default App