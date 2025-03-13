// src/app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';
import BackButton from '@/components/ui/BackButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Media } from '@/types/movie';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { setSearchQuery, searchResults, loading, error } = useMovieStore();

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState<'popularity' | 'vote_average' | 'release_date'>('popularity');
  const [filterBy, setFilterBy] = useState<'all' | 'movie' | 'tv'>('all');

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  // Apply sorting and filtering
  const sortedAndFilteredResults = [...searchResults]
    .filter((item: Media) => {
      if (filterBy === 'all') return true;
      return item.media_type === filterBy;
    })
    .sort((a: Media, b: Media) => {
      if (sortBy === 'popularity') {
        return (b.popularity || 0) - (a.popularity || 0);
      } else if (sortBy === 'vote_average') {
        return b.vote_average - a.vote_average;
      } else {
        const dateA = new Date(
          a.media_type === 'movie' ? a.release_date : a.first_air_date || '1970-01-01'
        ).getTime();
        const dateB = new Date(
          b.media_type === 'movie' ? b.release_date : b.first_air_date || '1970-01-01'
        ).getTime();
        return dateB - dateA;
      }
    });

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!query) return <div className="text-center py-10">No search query provided.</div>;
  if (sortedAndFilteredResults.length === 0) return <div className="text-center py-10">No results found.</div>;

  return (
    <div className="container mx-auto py-10">
      <BackButton />
      <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
      <p className="text-gray-400 mb-4">
        Found {sortedAndFilteredResults.length} {filterBy === 'all' ? 'results' : filterBy === 'movie' ? 'movies' : 'TV series'}
      </p>

      {/* Sorting and Filtering Controls */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="text-white mr-2">Sort by:</label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="vote_average">Rating</SelectItem>
              <SelectItem value="release_date">Release Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-white mr-2">Filter by:</label>
          <Select value={filterBy} onValueChange={(value) => setFilterBy(value as typeof filterBy)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">TV Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <MovieList movies={sortedAndFilteredResults} />
    </div>
  );
}