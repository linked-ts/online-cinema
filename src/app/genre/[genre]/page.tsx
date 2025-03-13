'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import BackButton from '@/components/ui/BackButton';

export default function GenrePage() {
  const { genre } = useParams();
  const { genres, fetchMoviesByGenre, filteredMovies, loading, error } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastFetchCount, setLastFetchCount] = useState<number | null>(null);

  const selectedGenre = genres.find(
    (g) => g.name.toLowerCase() === genre?.toString().toLowerCase() || g.id.toString() === genre
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMovies = useCallback(async () => {
    if (!selectedGenre?.id || !hasMore || loading) return;

    try {
      const beforeCount = filteredMovies.length;
      await fetchMoviesByGenre(selectedGenre.id, currentPage);
      const afterCount = filteredMovies.length;
      const fetchedCount = afterCount - beforeCount;
      setLastFetchCount(fetchedCount);

      if (fetchedCount < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more movies:', err);
    }
  }, [selectedGenre?.id, currentPage, hasMore, loading, fetchMoviesByGenre, filteredMovies]);

  useEffect(() => {
    if (selectedGenre?.id && currentPage === 1) {
      fetchMoviesByGenre(selectedGenre.id);
    }
  }, [selectedGenre?.id, fetchMoviesByGenre]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
          loadMovies();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, hasMore, loadMovies, loading]);

  if (loading && currentPage === 1) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!selectedGenre) return <div className="text-center py-10">Genre not found.</div>;

  return (
    <motion.div className="container mx-auto py-10">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">{selectedGenre.name} Movies</h1>
      <MovieList movies={filteredMovies} />
      {filteredMovies.length > 0 && (
        <div className="mt-6 text-center">
          {loading && <div className="text-gray-400">Loading more movies...</div>}
          {!loading && hasMore && <div ref={loadMoreRef} className="h-10" />}
          {!hasMore && <p className="text-gray-400">No more movies to load.</p>}
        </div>
      )}
    </motion.div>
  );
}