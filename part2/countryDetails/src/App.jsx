import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

import countryService from "./services/countryService";

function App() {
  const [countries, setCountries] = useState(null);
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    countryService.getAll().then((allCountries) => setCountries(allCountries));
  }, []);

  if (countries === null) {
    return <div>Loading... Please wait</div>;
  }

  const findCountry = () => {
    const countryArray = countries.map((country) => country.name.common);
    const countryFind = countryArray.filter((country) =>
      country.includes(countrySearch)
    );

    return countryFind;
  };

  const handleSearch = (event) => {
    setCountrySearch(event.target.value);
  };

  return (
    <div>
      <Filter countrySearch={countrySearch} handleSearch={handleSearch} />
      <CountryList
        countries={countries}
        countrySearch={countrySearch}
        findCountry={findCountry()}
      />
    </div>
  );
}

export default App;
