import { useState } from "react";

import CountryDetails from "./CountryDetails";

import weatherService from "./../services/weatherService";

const Country = ({ country, countrySearch }) => {
  const [weather, setWeather] = useState(null);

  if (countrySearch === "") {
    return null;
  } else if (
    country.name.common.toLowerCase() === countrySearch.toLowerCase()
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
    return <div>{country.name.common}</div>;
  }
};

export default Country;
