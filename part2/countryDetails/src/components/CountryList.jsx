import Country from './Country'

const CountryList = ({ countries, countrySearch, findCountry }) => {
    if (findCountry.length >= 10 && countrySearch != '') {
      return <div>Too many results</div>;
    } else if(findCountry.length < 10 && countrySearch != ''){
      return (
        <div>
            {countries.map((country) => (
              <Country
                key={country.name.common}
                country={country}
                countrySearch={countrySearch}
              />
            ))}
        </div>
      );
    } else {
      return <div>Search for a country</div>
    }
  };

export default CountryList