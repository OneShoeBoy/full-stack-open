import { useState } from "react";

import CountryDetails from "./CountryDetails";

import weatherService from "./../services/weatherService";

const Country = ({ country, countrySearch }) => {
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleClick = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (countrySearch === "" && selectedCountry === "") {
    return null;
  } else if (
    country.name.common.toLowerCase() === countrySearch.toLowerCase() ||
    country.name.common.toLowerCase() === selectedCountry.toLowerCase()
  ) {
    const lat = country.capitalInfo.latlng[0];
    const long = country.capitalInfo.latlng[1];

    weatherService.getWeather(lat, long).then((response) => {
      const weatherData = {
        temp: response.current.temp,
        wind: response.current.wind_speed,
        icon: response.current.weather[0].icon,
      };
      setWeather(weatherData);
    });

    if (weather === null) {
      return null;
    } else {
      return (
        <CountryDetails
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={Object.values(country.languages)}
          flag={country.flags.png}
          weather={weather}
        />
      );
    }
  } else if (
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
  ) {
    return (
      <div>
        {country.name.common}
        <button value={country.name.common} onClick={handleClick}>
          Submit
        </button>
      </div>
    );
  }
};

export default Country;
