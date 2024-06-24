const Languages = ({ language }) => {
  return <li>{language}</li>;
};

const CountryDetails = ({ name, capital, area, languages, flag }) => {
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
    </div>
  );
};

export default CountryDetails;
