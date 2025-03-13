'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Media } from '@/types/movie';
import Link from 'next/link';
import { useMovieStore } from '@/store/useMovieStore';
import { Info, Plus, Trash2, Star } from 'lucide-react';
import { useState } from 'react';

interface MovieCardProps {
  movie: Media;
  index?: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, watchlist, addToFavorites, removeFromFavorites, favorites } = useMovieStore();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const [isHovered, setIsHovered] = useState(false);
  
  const isInFavorites = favorites.some((m) => m.id === movie.id);
  const date = movie.media_type === 'tv' ? movie.first_air_date : movie.release_date;
  const year = date ? date.split('-')[0] : 'N/A';
  const detailsLink = movie.media_type === 'tv' ? `/tv-series/${movie.id}` : `/movie/${movie.id}`;
  
  // Calculate background gradients for better text visibility
  const overlayGradient = "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)";

  return (
    <motion.div
      key={index !== undefined ? `${movie.id}-${index}` : movie.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
      whileHover={{ y: -8 }}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden rounded-lg border-0 bg-transparent h-[400px] group">
        {/* Movie Poster with Overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: overlayGradient, opacity: isHovered ? 1 : 0.7 }}
          />
          
          <motion.img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.media_type === 'tv' ? movie.name : movie.title}
            className="w-full h-full object-cover transition-transform duration-700"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center text-sm">
            <Star className="w-3 h-3 mr-1 text-yellow-300" fill="#facc15" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          
          {/* Year Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-neutral-300 px-2 py-1 rounded-md text-xs">
            {year}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-1 leading-tight line-clamp-2 transition-transform duration-300 group-hover:-translate-y-1">
            {movie.media_type === 'tv' ? movie.name : movie.title}
          </h3>
          
          {/* Action Buttons - Initially hidden, shown on hover */}
          <motion.div 
            className="mt-3 space-y-2" 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={detailsLink} className="block">
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 transition-all duration-300 shadow-md hover:shadow-indigo-500/30"
              >
                <Info className="w-4 h-4 mr-2" /> View Details
              </Button>
            </Link>
            
            <Button
              className={`w-full transition-all duration-300 ${
                isInWatchlist 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' 
                  : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/50'
              }`}
              onClick={() => isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
            >
              {isInWatchlist ? (
                <><Trash2 className="w-4 h-4 mr-2" /> Remove</>
              ) : (
                <><Plus className="w-4 h-4 mr-2" /> Watchlist</>
              )}
            </Button>

            <Button
                  variant="outline"
                  className={`w-full transition-all duration-300 ${
                    isInFavorites 
                      ? 'bg-purple-500/20 text-pink-400 hover:bg-purple-500/30 border border-purple-500/50' 
                      : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/50'
                  }`}
                  onClick={() => (isInFavorites ? removeFromFavorites(movie.id) : addToFavorites(movie))}
                >
                  <Star className="w-4 h-4 mr-2" /> {isInFavorites ? 'Unfavorite' : 'Favorite'}
            </Button>

          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}