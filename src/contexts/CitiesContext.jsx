import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import PropTypes from "prop-types";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const intialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    intialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    // setIsLoading(true);
    dispatch({ type: "loading" });

    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data); // Assuming cities is an array inside the response object
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
        // console.error(error);
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
    // console.log(cities[0].cityName);
    fetchCities();
  }, [dispatch]);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      // dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data); // Assuming cities is an array inside the response object
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      // alert("There was an error loading data...");
      // console.error(error);
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
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
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating data...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        error,
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
