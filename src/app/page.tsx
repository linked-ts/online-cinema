'use client';

import { useEffect } from 'react';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import { fadeInStagger } from '@/animations/fadeIn';
import GenreFilter from '@/components/movie/GenreFilter';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/layout/Header';

export default function Home() {
  const { fetchMovies, fetchGenres, loading, error, movies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <motion.div
      className="container mx-auto py-10"
      initial="hidden"
      animate="visible"
      variants={fadeInStagger}
    >
      <HeroSection />
      <GenreFilter />
      <MovieList movies={movies} />
    </motion.div>
  );
}