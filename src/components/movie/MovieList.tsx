// src/components/movie/MovieList.tsx
'use client';

import { Media } from '@/types/movie';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';
import GenreFilter from './GenreFilter';

interface MovieListProps {
  movies: Media[];
  title?: string;
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}