import { useState } from "react"
import { login } from "../services/authService"
import { useNavigate, Link } from "react-router-dom"

function Login({ onLogin }){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    setLoading(true)
    setError("")

    try{
      const data = await login({ username, password })
      onLogin(data.token)
      navigate("/dashboard")
    }catch{
      setError("Invalid username or password. Please try again.")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="auth-container fade-in">
      <div className="card glassmorphism auth-card">
        <h2 className="text-center auth-title">Welcome Back</h2>
        <p className="subtitle text-center mb-4">Log in to your Health AI account</p>

        {error && <div className="auth-error fade-in">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn primary-btn auth-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="auth-link">Register instead</Link>
        </p>
      </div>
    </div>
  )
}

export default Login