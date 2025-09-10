import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query.trim()) {
      toast('Choose the topic');
      return; 
    }

    setMovies([]);
    setIsLoading(true);
    setError(null);
    setSelectedMovie(null);

      

    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast('Movies is not found');
      }

      setMovies(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknowing error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorClose = () => {
    setError(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} onClose={handleErrorClose} />}

      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid items={movies} onMovieClick={handleMovieSelect} />
      )}
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;