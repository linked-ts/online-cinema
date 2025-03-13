'use client';

import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import BackButton from '@/components/ui/BackButton';
import { Trash } from 'lucide-react';

export default function Watchlist() {
  const { favorites, removeFromFavorites } = useMovieStore();

  const clearFavorites = () => {
    favorites.forEach((item) => removeFromFavorites(item.id));
  };

  return (
    <motion.div className="container mx-auto py-10">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">No favorites added yet.</p>
      ) : (
        <>
          <div className="mb-4">
            <Button
                onClick={clearFavorites}
                className="bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
            <Trash className="w-5 h-5" />
                Clear Favorites
            </Button>
          </div>
          <MovieList movies={favorites} />
        </>
      )}
    </motion.div>
  );
}