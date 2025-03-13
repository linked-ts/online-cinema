'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import { motion } from 'framer-motion';
import BackButton from '@/components/ui/BackButton';

export default function TVGenrePage() {
  const { genre } = useParams();
  const { tvGenres, fetchTVSeriesByGenre, filteredTVSeries, loading, error } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastFetchCount, setLastFetchCount] = useState<number | null>(null);

  const selectedGenre = tvGenres.find(
    (g) => g.name.toLowerCase() === genre?.toString().toLowerCase() || g.id.toString() === genre
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadTVSeries = useCallback(async () => {
    if (!selectedGenre?.id || !hasMore || loading) return;

    try {
      const beforeCount = filteredTVSeries.length;
      await fetchTVSeriesByGenre(selectedGenre.id, currentPage);
      const afterCount = filteredTVSeries.length;
      const fetchedCount = afterCount - beforeCount;
      setLastFetchCount(fetchedCount);

      if (fetchedCount < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more TV series:', err);
    }
  }, [selectedGenre?.id, currentPage, hasMore, loading, fetchTVSeriesByGenre, filteredTVSeries]);

  useEffect(() => {
    if (selectedGenre?.id && currentPage === 1) {
      fetchTVSeriesByGenre(selectedGenre.id);
    }
  }, [selectedGenre?.id, fetchTVSeriesByGenre]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
          loadTVSeries();
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
  }, [loadMoreRef, hasMore, loadTVSeries, loading]);

  if (loading && currentPage === 1) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!selectedGenre) return <div className="text-center py-10">Genre not found.</div>;

  return (
    <motion.div className="container mx-auto py-10">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">{selectedGenre.name} TV Series</h1>
      <MovieList movies={filteredTVSeries} />
      {filteredTVSeries.length > 0 && (
        <div className="mt-6 text-center">
          {loading && <div className="text-gray-400">Loading more TV series...</div>}
          {!loading && hasMore && <div ref={loadMoreRef} className="h-10" />}
          {!hasMore && <p className="text-gray-400">No more TV series to load.</p>}
        </div>
      )}
    </motion.div>
  );
}