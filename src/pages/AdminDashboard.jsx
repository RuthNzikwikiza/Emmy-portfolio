import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { photosAPI } from '../utils/api'
import api from '../utils/api'
import '../styles/admin.css'

export default function AdminDashboard() {
  const { isAuthenticated, logout, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loadingPhotos, setLoadingPhotos] = useState(true)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    year: new Date().getFullYear().toString(),
    span: 'square',
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/admin')
  }, [isAuthenticated, authLoading, navigate])

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      const { data } = await photosAPI.list()
      setPhotos(data)
    } catch (error) {
      console.error('Failed to load photos:', error)
    } finally {
      setLoadingPhotos(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  // Upload image to Django backend
  const uploadImageToDjango = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const { data } = await api.post('/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    return data.url
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Upload image to Django (which uploads to Cloudinary)
      const imageUrl = await uploadImageToDjango(file)
      
      // Create photo in database
      await photosAPI.create({
        ...formData,
        img: imageUrl,
      })
      
      await loadPhotos()
      setFormData({
        title: '',
        category: 'Wedding',
        year: new Date().getFullYear().toString(),
        span: 'square',
      })
      e.target.value = ''
      alert('Photo uploaded successfully!')
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message))
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this photo?')) {
      try {
        await photosAPI.delete(id)
        await loadPhotos()
      } catch (error) {
        alert('Failed to delete photo')
      }
    }
  }

  const handleEditClick = (photo) => {
    setEditingPhoto({ ...photo })
  }

  const handleEditImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !editingPhoto) return

    setUploading(true)
    try {
      // Upload new image to Django
      const imageUrl = await uploadImageToDjango(file)
      setEditingPhoto({ ...editingPhoto, img: imageUrl })
      alert('Image uploaded! Click "Save Changes" to confirm.')
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message))
    } finally {
      setUploading(false)
    }
  }

  const handleEditSave = async () => {
    if (!editingPhoto) return
    try {
      await photosAPI.update(editingPhoto.id, {
        title: editingPhoto.title,
        category: editingPhoto.category,
        year: editingPhoto.year,
        span: editingPhoto.span,
        img: editingPhoto.img,
      })
      await loadPhotos()
      setEditingPhoto(null)
      alert('Photo updated!')
    } catch (error) {
      alert('Failed to update photo')
    }
  }

  if (authLoading || loadingPhotos) {
    return (
      <div className="admin-dashboard">
        <p style={{ textAlign: 'center', padding: '40px', color: '#f0ebe0' }}>
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Portfolio Manager</h1>
          <p className="admin-subtitle">{photos.length} photos</p>
        </div>
        <div className="admin-actions">
          <a href="/" className="view-site-btn">View Site</a>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Upload Form */}
      <div className="upload-section">
        <h2>Upload New Photo</h2>
        <div className="upload-form">
          <div className="form-row">
            <div className="form-field">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Forever Begins"
              />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="form-field">
              <label>Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
              />
            </div>

            <div className="form-field">
              <label>Size</label>
              <select
                value={formData.span}
                onChange={(e) => setFormData({ ...formData, span: e.target.value })}
              >
                <option value="square">Square</option>
                <option value="tall">Tall</option>
                <option value="wide">Wide</option>
              </select>
            </div>
          </div>

          <div className="upload-btn-wrap">
            <label className="upload-btn">
              {uploading ? 'Uploading...' : '📤 Choose Image to Upload'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading || !formData.title}
                style={{ display: 'none' }}
              />
            </label>
            {!formData.title && <p className="hint">Enter a title first</p>}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="admin-photos">
        <h2>All Photos</h2>
        <div className="admin-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="admin-photo-card">
              <img src={photo.img} alt={photo.title} />
              <div className="card-info">
                <h3>{photo.title}</h3>
                <p className="meta">
                  {photo.category} · {photo.year} · {photo.span}
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => handleEditClick(photo)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingPhoto && (
        <div className="modal-overlay" onClick={() => setEditingPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Photo</h2>
            
            {/* Image Preview + Upload */}
            <div className="edit-image-section">
              <img src={editingPhoto.img} alt={editingPhoto.title} className="edit-image-preview" />
              <label className="change-image-btn">
                {uploading ? 'Uploading new image...' : '📷 Change Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="form-field">
              <label>Title</label>
              <input
                type="text"
                value={editingPhoto.title}
                onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select
                value={editingPhoto.category}
                onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
              >
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="form-field">
              <label>Year</label>
              <input
                type="text"
                value={editingPhoto.year}
                onChange={(e) => setEditingPhoto({ ...editingPhoto, year: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Size</label>
              <select
                value={editingPhoto.span}
                onChange={(e) => setEditingPhoto({ ...editingPhoto, span: e.target.value })}
              >
                <option value="square">Square</option>
                <option value="tall">Tall</option>
                <option value="wide">Wide</option>
              </select>
            </div>

            <div className="modal-actions">
              <button onClick={() => setEditingPhoto(null)} className="btn-cancel">
                Cancel
              </button>
              <button onClick={handleEditSave} className="btn-save" disabled={uploading}>
                {uploading ? 'Please wait...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}