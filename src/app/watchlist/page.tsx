'use client';

import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import BackButton from '@/components/ui/BackButton';

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovieStore();

  const clearWatchlist = () => {
    watchlist.forEach((item) => removeFromWatchlist(item.id));
  };

  return (
    <motion.div className="container mx-auto py-10">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400">Your watchlist is empty. Add movies or TV series!</p>
      ) : (
        <>
          <div className="mb-4">
            <Button
              onClick={clearWatchlist}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Clear Watchlist
            </Button>
          </div>
          <MovieList movies={watchlist} />
        </>
      )}
    </motion.div>
  );
}