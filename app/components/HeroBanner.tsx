import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getBackdropUrl, getImageUrl } from '@/app/lib/tmdb';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3 drop-shadow-md">
            {movie.overview}
          </p>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-white font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-300">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <Link
            href={`/movie/${movie.id}`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

