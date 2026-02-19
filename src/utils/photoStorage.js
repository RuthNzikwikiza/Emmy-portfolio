const STORAGE_KEY = 'emmy_portfolio_photos'

export function getPhotos() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    
    const defaults = [
      { id: 1, title: 'Forever Begins',   category: 'Wedding',     year: '2024', img: 'https://picsum.photos/seed/wedding1/800/1000',    span: 'tall' },
      { id: 2, title: 'Just Us Two',      category: 'Pre-Wedding', year: '2024', img: 'https://picsum.photos/seed/prewedding1/900/600',  span: 'wide' },
      { id: 3, title: 'Golden Vows',      category: 'Anniversary', year: '2023', img: 'https://picsum.photos/seed/anniversary1/700/900', span: 'tall' },
      { id: 4, title: 'The Kiss',         category: 'Wedding',     year: '2024', img: 'https://picsum.photos/seed/wedding2/800/800',     span: 'square' },
      { id: 5, title: 'Sunrise Promise',  category: 'Pre-Wedding', year: '2024', img: 'https://picsum.photos/seed/prewedding2/1000/700', span: 'wide' },
      { id: 6, title: 'Ten Years Strong', category: 'Anniversary', year: '2023', img: 'https://picsum.photos/seed/anniversary2/700/1000',span: 'tall' },
      { id: 7, title: 'Joyful Moments',   category: 'Events',      year: '2024', img: 'https://picsum.photos/seed/event1/800/800',       span: 'square' },
      { id: 8, title: 'Family First',     category: 'Events',      year: '2023', img: 'https://picsum.photos/seed/event2/900/600',       span: 'wide' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
    return defaults
  }
  return JSON.parse(stored)
}

export function savePhotos(photos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
}

export function addPhoto(photo) {
  const photos = getPhotos()
  const newPhoto = {
    ...photo,
    id: Date.now(), // Simple ID generation
  }
  photos.push(newPhoto)
  savePhotos(photos)
  return newPhoto
}

export function deletePhoto(id) {
  const photos = getPhotos().filter(p => p.id !== id)
  savePhotos(photos)
}

export function updatePhoto(id, updates) {
  const photos = getPhotos()
  const index = photos.findIndex(p => p.id === id)
  if (index !== -1) {
    photos[index] = { ...photos[index], ...updates }
    savePhotos(photos)
  }
}