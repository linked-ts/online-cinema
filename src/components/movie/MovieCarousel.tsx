'use client';

import { motion } from 'framer-motion';
import MovieList from './MovieList';
import { useMovieStore } from '@/store/useMovieStore';

interface MovieCarouselProps {
  title: string;
}

export default function MovieCarousel({ title }: MovieCarouselProps) {
  const { filteredMovies } = useMovieStore();

  return (
    <motion.div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <MovieList movies={filteredMovies} />
    </motion.div>
  );
}