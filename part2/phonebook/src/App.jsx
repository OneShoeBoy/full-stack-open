import { useState } from 'react'

const Person = ({person}) => {
  console.log(person);
  return(
    <div>
      <p>{person.name} {person.phNumber}</p>
    </div>
  );  
}

// const PersonForm = (props) => {
//   return(
//     <form onSubmit={props.addName}>
//         <div>
//           name: <input value={props.name} onChange={props.handleNewName}/>
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//     </form>
//   )
// }

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
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const personObject={
      name: newName,
      phNumber: '',
      id: persons.length + 1,
    };
    console.log(personObject);
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handleNewName = (event) =>{
    setNewName(event.target.value);
  }
  // const result = persons.map(person => person.name);
  // console.log(result);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

export default App