import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedROute"

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"

// import Product from "./pages/Product"
// import Homepage from "./pages/Homepage"
// import Pricing from "./pages/Pricing"
// import Login from "./pages/Login"
// import AppLayout from "./pages/AppLayout"
// import PageNotFound from "./pages/PageNotFound"

const Homepage = lazy(() => import("./pages/Homepage"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Login = lazy(() => import("./pages/Login"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))

// dist/assets/index-8cffcb29.css   32.27 kB │ gzip:   5.35 kB
// dist/assets/index-f12974b6.js   531.88 kB │ gzip: 150.39 kB

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index replace element={<Navigate to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  )
}

export default App
