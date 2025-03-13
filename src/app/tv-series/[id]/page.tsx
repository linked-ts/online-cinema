'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMovieStore } from '@/store/useMovieStore';
import MovieDetails from '@/components/movie/MovieDetails';
import MovieList from '@/components/movie/MovieList';
import BackButton from '@/components/ui/BackButton';

export default function TVSeriesDetailsPage() {
  const { id } = useParams();
  const { movieDetails, fetchTVDetails, loading, error } = useMovieStore();

  useEffect(() => {
    if (id) {
      fetchTVDetails(Number(id));
    }
  }, [id, fetchTVDetails]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!movieDetails) return <div className="text-center py-10">TV Series not found.</div>;

  return (
    <div className="container mx-auto py-10">
      <BackButton />
      <MovieDetails movie={movieDetails} />
      {movieDetails.similar?.results && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Similar TV Series</h2>
          <MovieList movies={movieDetails.similar.results} />
        </div>
      )}
    </div>
  );
}