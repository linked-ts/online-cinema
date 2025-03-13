// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, Bookmark, Film, Menu, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from './layout/SearchBar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Online Cinema
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className={`relative ${isSearchFocused ? 'w-64' : 'w-48'} transition-all duration-300`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <SearchBar />
            </div>
            
            <Link 
              href="/watchlist" 
              className="flex items-center text-neutral-300 hover:text-white transition-colors duration-300 group"
            >
              <Bookmark className="w-4 h-4 mr-2 group-hover:text-indigo-400 transition-colors duration-300" />
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Watchlist</span>
                <span className="absolute left-0 top-0 inline-block -translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-indigo-400">Watchlist</span>
              </span>
            </Link>
            
            <Link 
              href="/tv-series" 
              className="flex items-center text-neutral-300 hover:text-white transition-colors duration-300 group"
            >
              <Film className="w-4 h-4 mr-2 group-hover:text-indigo-400 transition-colors duration-300" />
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">TV Series</span>
                <span className="absolute left-0 top-0 inline-block -translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-indigo-400">TV Series</span>
              </span>
            </Link>
            <Link 
              href="/favorites" 
              className="flex items-center text-neutral-300 hover:text-white transition-colors duration-300 group"
            >
              <Star className="w-4 h-4 mr-2 group-hover:text-indigo-400 transition-colors duration-300" />
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Favorites</span>
                <span className="absolute left-0 top-0 inline-block -translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-indigo-400">Favorites</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-neutral-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-neutral-900/95 backdrop-blur-md shadow-lg border-t border-neutral-800"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <SearchBar />
            </div>
            
            <Link 
              href="/watchlist" 
              className="flex items-center text-neutral-300 hover:text-white py-2 transition-colors duration-300"
            >
              <Bookmark className="w-5 h-5 mr-3 text-indigo-400" />
              Watchlist
            </Link>
            
            <Link 
              href="/tv-series" 
              className="flex items-center text-neutral-300 hover:text-white py-2 transition-colors duration-300"
            >
              <Film className="w-5 h-5 mr-3 text-indigo-400" />
              TV Series
            </Link>
            <Link 
              href="/favorites" 
              className="flex items-center text-neutral-300 hover:text-white py-2 transition-colors duration-300"
            >
              <Star className="w-5 h-5 mr-3 text-indigo-400" />
              Favorites
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}