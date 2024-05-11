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
  async function createCity(newCity) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data); // Assuming cities is an array inside the response object
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error creating data...");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was an error deleting data...");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
