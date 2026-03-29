import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Diagnosis from "./pages/Diagnosis"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
      {/* Basic Navigation Bar */}
      {isAuthenticated && (
        <nav className="glassmorphism top-nav fade-in">
          <div className="nav-brand">Health AI</div>
          <button className="btn secondary-btn small-btn" onClick={handleLogout}>Logout</button>
        </nav>
      )}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/diagnosis" element={
          <ProtectedRoute>
            <Diagnosis />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App