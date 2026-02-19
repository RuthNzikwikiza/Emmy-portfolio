import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('emmy_admin_auth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  const login = (password) => {
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'emmy2024'
    if (password === correctPassword) {
      setIsAuthenticated(true)
      localStorage.setItem('emmy_admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('emmy_admin_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}