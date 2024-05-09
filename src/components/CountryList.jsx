import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

import PropTypes from "prop-types";

function CountryList({ cities, isLoading }) {
  // const citiesArray = Object.values(cities);
  // console.log("Type of cities:", typeof cities);
  // console.log(cities);
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(
        (country) => (
          <CountryItem country={country} key={country.country} />
        )
        // Object.values(`${city.id}`)
      )}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // Adjust the type accordingly
      notes: PropTypes.string.isRequired, // Adjust the type accordingly
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
