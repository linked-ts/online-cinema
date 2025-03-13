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
import {Mouse} from 'lucide-react';
export default function GenreFilter() {
  const { genres, fetchMoviesByGenre, setSelectedGenre, fetchMovies } = useMovieStore();

  return (
    <div className="my-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2">
            Select Genre
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-white">
          <DropdownMenuItem
            onClick={() => {
              setSelectedGenre(null);
              fetchMovies(); // Reset to popular movies
            }}
            className="hover:bg-gray-700"
          >
            All Genres
          </DropdownMenuItem>
          {genres.map((genre) => (
            <DropdownMenuItem
              key={genre.id}
              asChild // Use Link as the child
            >
              <Link
                href={`/genre/${genre.name}`} // Navigate to genre page
                onClick={() => {
                  setSelectedGenre(genre);
                  fetchMoviesByGenre(genre.id);
                }}
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