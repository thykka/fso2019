import React, { useState, useEffect } from 'react';
import APIKeys from './API-keys.js';
import axios from 'axios';

const API_COUNTRIES_LIST = 'https://restcountries.eu/rest/v2/all';

// Note: API keys are not included with this repo. Please see API-keys.example.js for instructions.
const API_WEATHER_QUERY = `http://api.apixu.com/v1/current.json?key=${ APIKeys.apixu }&q=`;

const App = (props) => {
  // Create a state for the list of countries
  const [countries, setCountries] = useState([]);
  const getCountryList = () => {
    axios
      .get(API_COUNTRIES_LIST)
      .then(res => res.data)
      .then(data => {
        setCountries(data);
      });
  };
  useEffect(getCountryList, []);

  // Create a state for the weather cache
  const [weathers, setWeathers] = useState([]);
  const updateWeather = (...args) => {
    // Only update weather when there's a single search result
    if(filteredCountries.length === 1) {
      const country = filteredCountries[0];
      // Use the latitude & longitude for querying, as using country name yields
      // bad results in certain cases (i.e. country names that are also city names)
      const latlng = country.latlng.join(',');

      // Check if cache already contains a previous query with this latlng...
      if(
        !weathers.find(weather => weather.query === latlng)
      ) {
        axios.get(API_WEATHER_QUERY + latlng)
          .then(res => res.data)
          .then(data => {
            // Use the latlng as the cache key
            const newWeather = {
              query: latlng,
              ...data
            };
            // Add the new weather into cache
            setWeathers([...weathers, newWeather]);
          })
      }
    }
  };
  useEffect(updateWeather);

  /* Country list Filter */
  const [filter, setFilter] = useState('');
  const handleFilterInput = (event) => {
    setFilter(event.currentTarget.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.currentTarget.value);
  };
  const filterCountries = (needle) => {
    if(needle === '') {
      return countries;
    }
    // Case-insensitive matching, because why not?
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(needle.toLowerCase())
    );
    return filtered;
  };

  const filteredCountries = filterCountries(filter);

  /* Templates */
  const CountryList = (props) => {
    const { countries } = props;
    return !countries.length ? <p>No countries found</p> :
      countries.length === 1 ? <></> :
      countries.length > 10 ? <p>Please refine search ({ countries.length} results)</p> :
      <ul>{ countries.map(countryListItem) }</ul>;
  }

  const handleCountryItemClick = (event) => {
    const country = event.currentTarget.value;
    setFilter(country);
  };
  const countryListItem = (country) => {
    return <li key={country.name}>
      <button onClick={handleCountryItemClick} value={country.name}>{country.name}</button>
    </li>
  };

  const Country = (props) => {
    const { name = '', capital, population, languages = [], flag } = props.country;
    return <section>
      <h2>{ name }</h2>
      <dl>
        <dt>Capital</dt><dd>{ capital }</dd>
        <dt>Population</dt><dd>{ population }</dd>
        <dt>Languages</dt><dd>
          <ul>{languages.map(language =>
              <li key={ language.iso639_2 }>{ language.name }</li>
          )}</ul></dd>
        <dt>Flag</dt>
        <dd><img src={ flag } alt={ 'Flag of ' + name.toLowerCase() } /></dd>
      </dl>
    </section>
  }

  const Weather = (props) => {
    if(!props.weathers || !props.weathers.length) {
      return <></>;
    }
    const { weathers, country } = props;
    const filteredWeathers = weathers.filter(weather => weather.query === country.latlng.join(','));

    if(filteredWeathers.length === 0) {
      return <></>;
    }

    const { current, location } = filteredWeathers[0];

    const { temp_c, feelslike_c, wind_dir, wind_kph } = current;

    const windExpanded = {
      'NE': 'Northeast',
      'SE': 'Southeast',
      'SW': 'Southwest',
      'NW': 'Northwest',
      'N': 'North',
      'E': 'East',
      'S': 'South',
      'W': 'West'
    }[wind_dir];

    return <aside className="weather">
      <h3>Weather at { location.name }, { location.country }</h3>
      <img src={current.condition.icon} alt={current.condition.text} />
      <p>Condition: { current.condition.text } — { temp_c }°C (feels like: { feelslike_c }°C)</p>
      <p>Wind: { windExpanded } { wind_kph }km/h </p>
    </aside>
  }

  return (
    <section className="atlas">
      <input value={ filter } onInput={ handleFilterInput } onChange={ handleFilterChange } />
      { // Show country details if only one result is available, otherwise show list
        filteredCountries.length === 1 ?
          <>
            <Country country={filteredCountries[0]} />
            <Weather weathers={weathers} country={filteredCountries[0]} />
          </> :
          <CountryList countries={filteredCountries} />
      }
    </section>
  );
};

export default App;
