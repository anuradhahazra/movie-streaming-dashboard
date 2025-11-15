import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from './lib/tmdb';

export default async function HomePage() {
  // Fetch all movie data in parallel
  const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ]);

  // Use the first popular movie as hero banner
  const heroMovie = popularMovies[0];

  return (
    <main className="min-h-screen bg-black">
      <Header />
      {heroMovie && <HeroBanner movie={heroMovie} />}
      <div className="mt-8 pb-12">
        <MovieRow title="Popular Now" movies={popularMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        <MovieRow title="Upcoming" movies={upcomingMovies} />
      </div>
    </main>
  );
}

