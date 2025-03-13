'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMovieStore } from '@/store/useMovieStore';
import Link from 'next/link';

export default function TVGenreFilter() {
  const { tvGenres, fetchTVSeries, setSelectedGenre } = useMovieStore();

  return (
    <div className="my-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-white border-gray-500 hover:bg-gray-700">
            Select Genre
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-white">
          <DropdownMenuItem
            onClick={() => {
              setSelectedGenre(null);
              fetchTVSeries();
            }}
            className="hover:bg-gray-700"
          >
            All Genres
          </DropdownMenuItem>
          {tvGenres.map((genre) => (
            <DropdownMenuItem key={genre.id} asChild>
              <Link
                href={`/tv-genre/${genre.name}`}
                onClick={() => setSelectedGenre(genre)}
                className="w-full block hover:bg-gray-700"
              >
                {genre.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}