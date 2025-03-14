// src/app/search/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMovieStore } from '@/store/useMovieStore';
import MovieList from '@/components/movie/MovieList';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchResults, setSearchQuery, loading, error } = useMovieStore();
  const [results, setResults] = useState(searchResults);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        await setSearchQuery(query);
        setResults(searchResults); // Sync with store
      }
    };
    fetchSearchResults();
  }, [query, setSearchQuery, searchResults]);

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!query || results.length === 0) return <div className="text-center py-10 text-gray-400">No results found.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Search Results for "{query}"</h1>
      <MovieList movies={results} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}