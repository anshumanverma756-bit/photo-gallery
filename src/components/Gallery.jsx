import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import PhotoCard from './PhotoCard.jsx'
import {
  STORAGE_KEY,
  favouritesReducer,
  loadFavourites,
} from '../reducers/favouritesReducer.js'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const handleSearch = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>
          <p className="mt-1 text-sm text-slate-500">
            {favourites.length} {favourites.length === 1 ? 'favourite' : 'favourites'} saved
          </p>
        </div>
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search by author"
          aria-label="Search photos by author"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:max-w-xs"
        />
      </header>

      {loading && (
        <div className="flex justify-center py-24" role="status" aria-label="Loading photos">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
      )}

      {!loading && error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load photos: {error}. Check your connection and refresh the page.
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-24 text-center text-slate-500">No photos match that author name.</p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </main>
  )
}
