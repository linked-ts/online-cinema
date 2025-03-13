'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          Online Cinema
        </Link>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <Link href="/watchlist" className="text-white hover:text-yellow-500">
            Watchlist
          </Link>
          <Link href="/tv-series" className="text-white hover:text-yellow-500">
            TV Series
          </Link>
        </div>
      </div>
    </header>
  );
}