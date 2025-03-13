'use client';

import { useEffect } from 'react';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import { fadeInStagger } from '@/animations/fadeIn';
import TVGenreFilter from '@/components/tv/TVGenreFilter';
import BackButton from '@/components/ui/BackButton';

export default function TVSeriesPage() {
  const { tvSeries, fetchTVSeries, fetchTVGenres, loading, error } = useMovieStore();

  useEffect(() => {
    fetchTVSeries();
    fetchTVGenres();
  }, [fetchTVSeries, fetchTVGenres]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <motion.div
      className="container mx-auto py-10"
      initial="hidden"
      animate="visible"
      variants={fadeInStagger}
    >
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">Popular TV Series</h1>
      <TVGenreFilter />
      <MovieList movies={tvSeries} />
    </motion.div>
  );
}