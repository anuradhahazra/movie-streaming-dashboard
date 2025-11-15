import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/app/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative w-[150px] md:w-[200px] flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
            sizes="(max-width: 768px) 150px, 200px"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <div className="mt-2">
          <h3 className="text-white text-sm md:text-base font-semibold line-clamp-2 group-hover:text-red-400 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-gray-400 text-xs">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

