import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/admin.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) {
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-box">
        <h1>Emmy001 Admin</h1>
        <p className="subtitle">Portfolio Management</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <a href="/" className="back-link">← Back to site</a>
      </div>
    </div>
  )
}