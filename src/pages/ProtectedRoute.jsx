import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/FakeAuthContext"
import { useEffect } from "react"

function ProtectedRoute({ children }) {
  const { isAuthentificated } = useAuth()
  const navigate = useNavigate()

  useEffect(
    function () {
      if (!isAuthentificated) navigate("/")
    },
    [isAuthentificated, navigate]
  )

  return isAuthentificated ? children : null
}

export default ProtectedRoute
