const Languages = ({ language }) => {
  return <li>{language}</li>;
};

const CountryDetails = ({ name, capital, area, languages, flag, weather }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital City: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages Spoken</h3>
      <ul>
        {languages.map((language) => (
          <Languages key={language} language={language} />
        ))}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} />
      <h3>Weather</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="Icon of current weather conditions"
      />
      <p>Temperature: {weather.temp} Celsius</p>
      <p>Windspeed: {weather.wind}m/s</p>
    </div>
  );
};

export default CountryDetails;
