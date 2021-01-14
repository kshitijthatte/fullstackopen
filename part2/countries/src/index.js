import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const CountryInfo = ({ filteredCountry }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${filteredCountry.capital}`
      )
      .then((response) => {
        const weatherData = response.data.current;
        setWeather(weatherData);
        console.log(weather);
      });
  }, []);

  return (
    <>
      <h2>{filteredCountry.name}</h2>
      <p>capital {filteredCountry.capital}</p>
      <p>population {filteredCountry.population}</p>
      <h3>languages</h3>
      <ul>
        <p>
          {filteredCountry.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </p>
      </ul>
      <img src={filteredCountry.flag} alt="flag" width="100px" />
      <h3>Weather in {filteredCountry.capital} </h3>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celcius
      </p>
      <img src={weather.weather_icons} alt="" />
      <p>
        <strong>wind: </strong>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </>
  );
};

const CountryDetails = ({ count, filteredCountry }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {count === "1" ? (
        <CountryInfo filteredCountry={filteredCountry} />
      ) : (
        <>
          {filteredCountry.name}
          <button onClick={() => setShow(!show)}>show</button>
        </>
      )}

      {show && <CountryInfo filteredCountry={filteredCountry} />}
    </div>
  );
};

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    return <CountryDetails count="1" filteredCountry={filteredCountries[0]} />;
  }
  if (filteredCountries.length < 10) {
    return filteredCountries.map((country) => (
      <CountryDetails count="0" key={country.cioc} filteredCountry={country} />
    ));
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getWeather = async () => {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    setCountries(response.data);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleChange = (event) => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <div>
        find countries
        <input onChange={handleChange} />
      </div>
      <Countries filteredCountries={filteredCountries} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
