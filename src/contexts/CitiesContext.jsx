import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react"

const BASE_URL = "https://world-wise-json-server.vercel.app"

const CitiesContext = createContext()

const inititalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  sidebarIsOpen: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      }
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    inititalState
  )

  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" })

        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        })
      }
    }

    fetchCities()
  }, [])

  const fetchCitiesAgain = useCallback(async () => {
    try {
      dispatch({ type: "loading" })

      const res = await fetch(`${BASE_URL}/cities`)
      const data = await res.json()
      dispatch({ type: "cities/loaded", payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      })
    }
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return

      try {
        dispatch({ type: "loading" })

        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: "city/loaded", payload: data })
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    if (cities.filter((city) => city.cityName === newCity.cityName).length > 0)
      return

    try {
      dispatch({ type: "loading" })

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()

      dispatch({ type: "city/created", payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      })
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" })

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      })

      dispatch({ type: "city/deleted", payload: id })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      })
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
        fetchCitiesAgain,
        // sidebarIsOpen,
        // setSidebarIsOpen,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider")
  return context
}

export { CitiesProvider, useCities }
