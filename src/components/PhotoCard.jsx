import { memo } from 'react'

function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <img
        src={`https://picsum.photos/id/${photo.id}/600/400`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-3/2 w-full bg-slate-200 object-cover"
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-medium text-slate-700">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          className="rounded-full p-1.5 transition-colors hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${isFavourite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-slate-400'}`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default memo(PhotoCard)
