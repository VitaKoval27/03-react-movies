import axios from 'axios';
import type { Movie } from '../Components/types/movie';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TmdbMovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}



export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  
    if (!TMDB_TOKEN) {
    throw new Error('TMDB token is not set in VITE_TMDB_TOKEN environment variable.');
  }

   const config = {
    params: {
      query: topic, // Пошуковий запит
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

   try {
    
    const response = await axios.get<TmdbMovieResponse>(
      'https://api.themoviedb.org/3/search/movie',
      config
    );

   
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching movies:', error.message);
      throw new Error('Failed to fetch movies from the API.');
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

