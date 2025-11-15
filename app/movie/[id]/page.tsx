import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import { getMovieById, getBackdropUrl, getImageUrl } from '@/app/lib/tmdb';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie;
  try {
    movie = await getMovieById(movieId);
  } catch (error) {
    notFound();
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 md:px-8 -mt-32 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          <div className="w-full md:w-[300px] flex-shrink-0">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 pb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-xl text-gray-400 italic mb-4">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-white font-semibold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {movie.runtime && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{movie.runtime} min</span>
                </>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.production_companies.map((company) => (
                    <span
                      key={company.id}
                      className="text-gray-300 text-sm px-2 py-1 bg-gray-800 rounded"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/"
              className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

