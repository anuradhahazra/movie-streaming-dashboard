import { Movie, MovieDetails, TMDBResponse } from '@/types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getApiKey = (): string => {
  // Use server-side only environment variable (not exposed to client)
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB API key is not configured. Please set TMDB_API_KEY in .env.local');
  }
  return apiKey;
};

export const fetchTMDB = async <T>(endpoint: string): Promise<T> => {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${apiKey}`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<TMDBResponse<Movie>>('/movie/popular');
  return data.results;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<TMDBResponse<Movie>>('/movie/top_rated');
  return data.results;
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<TMDBResponse<Movie>>('/movie/upcoming');
  return data.results;
};

export const getMovieById = async (id: number): Promise<MovieDetails> => {
  return fetchTMDB<MovieDetails>(`/movie/${id}`);
};

export const getImageUrl = (path: string | null, size: 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string => {
  if (!path) {
    return '/placeholder-movie.png'; // Fallback placeholder
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  if (!path) {
    return '/placeholder-backdrop.png'; // Fallback placeholder
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

