const Filter = ({countrySearch, handleSearch}) => {
    return (
      <div>
        Find countries: <input value={countrySearch} onChange={handleSearch}></input>
      </div>
    );
  };

export default Filter