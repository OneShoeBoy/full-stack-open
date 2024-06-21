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

export default Person