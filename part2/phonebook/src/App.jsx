import { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>
      <p>{person.name} {person.phNumber}</p>
    </div>
  );  
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
  console.log(props);
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phNumber: '0423123123',
      id: 1
    },
    {
      name: 'Isaac Davidson',
      phNumber: '0422593853',
      id: 2
    }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


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

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        name={newName}
        phone={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}

export default App