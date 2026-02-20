import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('emmy_token')
      if (token) {
        try {
          const { data } = await authAPI.me()
          setUser(data)
          setIsAuthenticated(true)
        } catch (error) {
          localStorage.removeItem('emmy_token')
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (username, password) => {
    try {
      const { data } = await authAPI.login(username, password)
      localStorage.setItem('emmy_token', data.access)
      setUser(data.user)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('emmy_token')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}