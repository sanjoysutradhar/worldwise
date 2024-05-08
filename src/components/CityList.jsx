import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

import PropTypes from "prop-types";

function CityList({ cities, isLoading }) {
  // const citiesArray = Object.values(cities);
  // console.log("Type of cities:", typeof cities);
  // console.log(cities);
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map(
        (city) => (
          <CityItem city={city} key={city.id} />
        )
        // Object.values(`${city.id}`)
      )}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // Adjust the type accordingly
      notes: PropTypes.string.isRequired, // Adjust the type accordingly
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CityList;
