import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('emmy_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('emmy_token')
      window.location.href = '/admin'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (username, password) => api.post('/auth/login/', { username, password }),
  me: () => api.get('/auth/me/'),
}

// Photos API
export const photosAPI = {
  list: () => api.get('/photos/'),
  get: (id) => api.get(`/photos/${id}/`),
  create: (data) => api.post('/photos/', data),
  update: (id, data) => api.put(`/photos/${id}/`, data),
  delete: (id) => api.delete(`/photos/${id}/`),
}

export default api