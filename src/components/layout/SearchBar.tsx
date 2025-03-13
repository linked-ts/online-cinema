// src/components/SearchBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useMovieStore } from '@/store/useMovieStore';
import { Media } from '@/types/movie';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { setSearchQuery, searchResults, loading, error } = useMovieStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('handleClickOutside: Checking if click is outside', wrapperRef.current);
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        console.log('handleClickOutside: Closing dropdown');
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('handleSearch: Input value changed to', value);
    setQuery(value);
    if (value.length > 2) {
      console.log('handleSearch: Triggering search with query', value);
      await setSearchQuery(value);
      console.log('handleSearch: Search results', searchResults);
      setShowDropdown(true);
    } else {
      console.log('handleSearch: Query too short, resetting');
      setShowDropdown(false);
      await setSearchQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit: Form submitted with query', query, 'Results:', searchResults);
    if (query.trim() && searchResults.length > 0) {
      console.log('handleSubmit: Redirecting to /search?q=', query);
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    } else {
      console.log('handleSubmit: No results or empty query, not redirecting');
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="bg-gray-800 text-white border-gray-600 w-full"
        />
      </form>
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-50 w-full bg-gray-800 border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto">
          {searchResults.map((result: Media) => (
            <Link
              key={result.id}
              href={
                result.media_type === 'tv'
                  ? `/tv-series/${result.id}`
                  : `/movie/${result.id}`
              }
              className="block px-4 py-2 text-white hover:bg-gray-700"
              onClick={() => setShowDropdown(false)}
            >
              {result.media_type === 'tv' ? result.name : result.title} ({result.media_type})
            </Link>
          ))}
        </div>
      )}
      {loading && <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">Loading...</div>}
      {error && <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">{error}</div>}
    </div>
  );
}