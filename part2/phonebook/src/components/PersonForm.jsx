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

export default PersonForm