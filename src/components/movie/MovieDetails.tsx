// src/components/movie/MovieDetails.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Media, Video } from '@/types/movie';
import { useMovieStore } from '@/store/useMovieStore';
import { motion } from 'framer-motion';
import TrailerModal from './TrailerModal';
import { Plus, Trash2, Calendar, Clock, Film, Star, Users, Play, Bookmark } from 'lucide-react';

interface MovieDetailsProps {
  movie: Media;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const { addToWatchlist, removeFromWatchlist, watchlist, addToFavorites, removeFromFavorites, favorites } = useMovieStore();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const isInFavorites = favorites.some((m) => m.id === movie.id);
  const leadActor = movie.credits?.cast[0];
  const trailer = movie.videos?.results?.find((video: Video) => video.type === 'Trailer');

  const date = movie.media_type === 'tv' ? movie.first_air_date : movie.release_date;
  const year = date ? date.split('-')[0] : 'N/A';
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'N/A';

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="relative bg-neutral-900 rounded-xl overflow-hidden shadow-xl">
        {/* Background image with overlay */}
        {movie.backdrop_path && (
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-900/80 z-10"></div>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="Background"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        )}

        <div className="relative z-20 p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-shrink-0"
            >
              {movie.poster_path && (
                <div className="relative w-64 h-96 md:w-72 md:h-108 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.media_type === 'tv' ? movie.name : movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] rounded-lg"></div>
                </div>
              )}
            </motion.div>

            {/* Movie Info */}
            <div className="flex-grow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-neutral-300">
                  {movie.media_type === 'tv' ? movie.name : movie.title}
                </h1>
                
                <div className="flex items-center mb-6 space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="#facc15" />
                    <span className="text-lg font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="h-5 w-0.5 bg-neutral-700"></div>
                  <div className="text-neutral-400">{year}</div>
                  {movie.media_type === 'movie' &&
                    'runtime' in movie &&
                    typeof movie.runtime === 'number' &&
                    movie.runtime > 0 && (
                      <>
                        <div className="h-5 w-0.5 bg-neutral-700"></div>
                        <div className="flex items-center text-neutral-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                        </div>
                      </>
                    )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-lg text-neutral-300 mb-6 leading-relaxed backdrop-blur-sm bg-neutral-800/20 p-4 border-l-2 border-indigo-500 rounded-r-md">
                  {movie.overview}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex items-start">
                    <Film className="w-5 h-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-400 mb-1">Genres</h3>
                      <p className="text-white">
                        {movie.genres.map((genre) => genre.name).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-indigo-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-400 mb-1">
                      {movie.media_type === 'tv' ? 'First Aired' : 'Release Date'}
                    </h3>
                    <p className="text-white">{formattedDate}</p>
                  </div>
                </div>
                
                {movie.media_type === 'tv' &&
                  'number_of_seasons' in movie &&
                  typeof movie.number_of_seasons === 'number' &&
                  movie.number_of_seasons > 0 && (
                    <div className="flex items-start">
                      <Film className="w-5 h-5 text-indigo-400 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-400 mb-1">Seasons</h3>
                        <p className="text-white">{movie.number_of_seasons}</p>
                      </div>
                    </div>
                  )}
                
                {leadActor && (
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-400 mb-1">Lead Actor</h3>
                      <p className="text-white">
                        {leadActor.name} <span className="text-neutral-400">as {leadActor.character}</span>
                      </p>
                    </div>
                  </div>
                )}
                
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {trailer && (
                  <Button
                    onClick={() => document.getElementById(trailer.key)?.click()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 rounded-md shadow-md hover:shadow-indigo-500/30 transition-all duration-300 flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" /> Watch Trailer
                  </Button>
                )}

                <div className='flex gap-4'>
                <Button
                  onClick={() => isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                  className={`px-6 py-5 rounded-md shadow-md transition-all duration-300 flex items-center ${
                    isInWatchlist 
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' 
                      : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/50'
                  }`}
                >
                  {isInWatchlist ? (
                    <><Trash2 className="w-5 h-5 mr-2" /> Remove from Watchlist</>
                  ) : (
                    <><Bookmark className="w-5 h-5 mr-2" /> Add to Watchlist</>
                  )}
                </Button>
                <Button
                                  variant="outline"
                                  className={`px-6 py-5 transition-all duration-300 ${
                                    isInFavorites 
                                      ? 'bg-purple-500/20 text-pink-400 hover:bg-purple-500/30 border border-purple-500/50' 
                                      : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/50'
                                  }`}
                                  onClick={() => (isInFavorites ? removeFromFavorites(movie.id) : addToFavorites(movie))}
                                >
                                  <Star className="w-4 h-4 mr-2" /> {isInFavorites ? 'Unfavorite' : 'Favorite'}
                            </Button>
                            </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {trailer && <TrailerModal trailerKey={trailer.key} />}
    </motion.div>
  );
}