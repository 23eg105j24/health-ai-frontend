import { useState } from "react"
import { register } from "../services/authService"
import { useNavigate, Link } from "react-router-dom"

function Register(){
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function handleRegister(e){
    e.preventDefault()
    setLoading(true)
    setError("")

    try{
      await register({ username, email, password })
      alert("Registration successful! Please login.")
      navigate("/login")
    }catch{
      setError("Registration failed. Try a different username or email.")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="auth-container fade-in">
      <div className="card glassmorphism auth-card">
        <h2 className="text-center auth-title">Create Account</h2>
        <p className="subtitle text-center mb-4">Join Health AI today</p>

        {error && <div className="auth-error fade-in">{error}</div>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="btn primary-btn auth-submit" disabled={loading}>
            {loading ? "Registering..." : "Register Account"}
          </button>
        </form>

        <p className="text-center mt-4">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register