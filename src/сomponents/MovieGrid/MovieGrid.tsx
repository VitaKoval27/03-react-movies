import type{ Movie } from '../../types/movie';
import css from "./MovieGrid.module.css"

interface MovieGridProps {
  items: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function MovieGrid({ items, onMovieClick }: MovieGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {items.map(movie => (
        <li key={movie.id} onClick={() => onMovieClick(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
