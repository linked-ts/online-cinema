// src/components/favorites/Favorites.tsx
'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Star } from 'lucide-react';
import { Media } from '@/types/movie';
import { useMovieStore } from '@/store/useMovieStore';
import Link from 'next/link';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useMovieStore();

  if (favorites.length === 0) {
    return <div className="text-center py-10 text-gray-400">No favorites added yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {favorites.map((movie) => {
        const date = movie.media_type === 'tv' ? movie.first_air_date : movie.release_date;
        const year = date ? date.split('-')[0] : 'N/A';

        return (
          <Card
            key={movie.id}
            className="overflow-hidden bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-0 relative">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.media_type === 'tv' ? movie.name : movie.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="absolute top-2 right-2 bg-purple-900 text-white rounded-full px-2 py-1 text-xs flex items-center">
                <Star className="w-4 h-4 mr-1" /> {movie.vote_average.toFixed(1)}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex flex-col items-start gap-2 bg-gray-800">
              <h3 className="text-xl font-bold text-white">
                {movie.media_type === 'tv' ? movie.name : movie.title}
              </h3>
              <p className="text-sm text-gray-400">{year}</p>
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  asChild
                >
                  <Link href={`/${movie.media_type}/${movie.id}`}>
                    <Play className="w-4 h-4 mr-2" /> View Details
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  <Star className="w-4 h-4 mr-2" /> Unfavorite
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}