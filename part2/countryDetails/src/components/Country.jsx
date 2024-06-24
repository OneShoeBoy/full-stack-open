import CountryDetails from "./CountryDetails";

const Country = ({ country, countrySearch }) => {
  if (countrySearch === "") {
    return null;
  } else if (
    country.name.common.toLowerCase() === countrySearch.toLowerCase()
  ) {
    return (
      <CountryDetails
        name={country.name.common}
        capital={country.capital}
        area={country.area}
        languages={Object.values(country.languages)}
        flag={country.flags.png}
      />
    );
  } else if (
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
  ) {
    return(
      <div>
        {country.name.common}
      </div>
      
    ) 
  }
};

export default Country;
