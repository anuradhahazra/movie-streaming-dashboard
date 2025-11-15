import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export const metadata = {
  title: "Movies | MovieX",
};

async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load movies");

  return res.json();
}

export default async function MoviesPage() {
  const data = await getMovies();
  const movies = data.results;

  return (
    <div className="px-6 py-24 min-h-screen bg-black text-white">
      <Header />
      
      <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie: any) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:opacity-90"
                />
              </div>

              <h3 className="mt-3 text-sm font-medium text-gray-200 group-hover:text-white line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                ⭐ <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
