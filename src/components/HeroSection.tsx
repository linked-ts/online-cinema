// src/components/HeroSection.tsx
'use client';

import { useMovieStore } from '@/store/useMovieStore';
import { motion } from 'framer-motion';
import TrailerModal from './movie/TrailerModal';
import { Media, Movie, TVSeries, Video } from '@/types/movie';
import { Play } from 'lucide-react';

export default function HeroSection() {
  const { movieDetails, loading, error } = useMovieStore();

  const video = movieDetails?.videos?.results?.find((v: Video) => v.type === 'Trailer');

  if (loading) return <div className="flex items-center justify-center h-[60vh] bg-neutral-950"><div className="w-10 h-10 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div></div>;
  if (error) return <div className="flex items-center justify-center h-[60vh] bg-neutral-950 text-red-400 font-medium">{error}</div>;
  if (!movieDetails) return <div className="flex items-center justify-center h-[60vh] bg-neutral-950 text-neutral-400 font-medium">No featured content available.</div>;

  const getTitle = (media: Media) => {
    return media.media_type === 'tv' ? (media as TVSeries).name : (media as Movie).title;
  };

  return (
    <div className="relative w-full h-[75vh] overflow-hidden bg-neutral-950 mb-8">
      {/* Background with subtle gradient overlay */}
      {movieDetails.backdrop_path && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40 z-10"></div>
          <motion.div
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt={getTitle(movieDetails)}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-end h-full max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
            {getTitle(movieDetails)}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg mb-8 font-light leading-relaxed backdrop-blur-sm bg-neutral-900/20 p-4 border-l-2 border-indigo-500 text-neutral-200"
          >
            {movieDetails.overview}
          </motion.p>
          
          {video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button
                onClick={() => document.getElementById(video.key)?.click()}
                className="group px-8 py-3 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md hover:shadow-indigo-500/30 transition-all duration-300 flex items-center"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" /> 
                <span className="relative inline-block overflow-hidden">
                  <span className="group-hover:translate-y-full transition-transform duration-300 inline-block">
                    Watch Trailer
                  </span>
                  <span className="absolute top-0 left-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 inline-block">
                    Watch Trailer
                  </span>
                </span>
              </button>
            </motion.div>
          )}
          {video && <TrailerModal trailerKey={video.key} />}
        </motion.div>
      </div>
    </div>
  );
}