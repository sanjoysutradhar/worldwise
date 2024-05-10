import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data); // Assuming cities is an array inside the response object
      } catch (error) {
        alert("There was an error loading data...");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    // console.log(cities[0].cityName);
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data); // Assuming cities is an array inside the response object
    } catch (error) {
      alert("There was an error loading data...");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === "undefined")
    throw new Error(
      "The cities context try to use outside of the CitiesProvider"
    );
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useCities, CitiesProvider };
