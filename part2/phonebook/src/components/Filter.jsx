const Filter = (props) => {
    return (
      <div>
        Search: <input value={props.nameSearch} onChange={props.handleSearch}/>
      </div>
    )
  }

export default Filter